'use client';

import { deleteCoverImage } from '@/actions';
import { UploadCloudIcon } from '@/assets/svgs';
import { useEdgeStore } from '@/lib/edgestore';
import { ImageFile } from '@/lib/types';
import { cn, formatFileSize } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

// Define the props for the CoverUpload component.
interface CoverUploadProps {
  className?: string;
  label?: string | React.ReactNode;
  name: string;
  image: Partial<ImageFile>;
  setImage: Dispatch<SetStateAction<Partial<ImageFile>>>;
}

// CoverUpload component handles image uploading, previewing, and deletion.
const CoverUpload = ({
  className,
  label,
  name,
  image,
  setImage,
}: CoverUploadProps) => {
  // Retrieve the edgestore instance used for image uploads.
  const { edgestore } = useEdgeStore();

  // Set initial upload progress to 100% if an image URL exists, otherwise 0%.
  const [progress, setProgress] = useState(() => (image.url ? 100 : 0));

  // Handler for file input changes; initiates the upload process.
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate that the selected file is an image.
    if (!file.type.match(/^image\//)) {
      toast.error('Image files only');
      return;
    }

    // Generate a preview URL for the selected file.
    const preview = URL.createObjectURL(file);

    try {
      // Upload the image file and update progress during the process.
      const uploadedImg = await edgestore.taskCovers.upload({
        file,
        options: { temporary: true },
        onProgressChange: (progressValue) => setProgress(progressValue),
      });

      // Update the image state with details of the uploaded file.
      setImage((prev) => ({
        ...prev,
        name: file.name,
        image: file,
        url: uploadedImg.url,
        preview,
        size: file.size.toString(),
      }));
    } catch (error) {
      // Show error message, replacing raw file size limit with a human-readable value.
      toast.error(
        error instanceof Error
          ? error.message.replace('3145728', '3MB')
          : 'Something went wrong please try again',
        { position: 'top-center' }
      );
    }
  };

  // Handler to delete the currently uploaded cover image.
  const handleDelete = async () => {
    const res = await deleteCoverImage(image.url);
    if (res.success) {
      toast.success(res.msg);
      setImage({}); // Clear the image state.
      setProgress(0); // Reset upload progress.
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className={cn('grid w-full items-start', className)}>
      {/* Optional label for the upload area */}
      {label && <h3 className='~text-xs/sm mb-1.5 font-medium'>{label}</h3>}

      {/* If no image has been uploaded, render the upload input */}
      {!image.url ? (
        <label className='input min-h-[7.8rem] cursor-pointer p-4'>
          <div className='grid place-items-center gap-3'>
            {/* Upload icon */}
            <div className='grid size-10 place-items-center rounded-full border-[6px] border-[#F9FAFB] bg-[#F2F4F7]'>
              <UploadCloudIcon />
            </div>
            {/* Upload instructions */}
            <p className='text-center text-[#667085]'>
              <span className='font-medium text-[#6941C6]'>Click to upload</span> or drag and drop
              <br />
              <span className='text-xs'>PNG or JPG</span>
            </p>
            {/* Show uploading message if upload is in progress */}
            {progress > 0 && <p className='text-xs'>Uploading...</p>}
          </div>
          <input
            aria-labelledby={`${name}-error`}
            type='file'
            onChange={handleChange}
            hidden
          />
        </label>
      ) : (
        // If an image is uploaded, render the image preview and details.
        <div className='input flex min-h-[7.8rem] cursor-pointer items-center p-4'>
          {/* Image preview container */}
          <div className='h-full w-full max-w-[11.69rem] overflow-hidden rounded-lg'>
            <Image
              className='size-full object-cover'
              src={image.url}
              alt={image.name ?? ''}
              width={980}
              height={480}
            />
          </div>

          {/* Image details and progress bar */}
          <div className='~text-xs/sm ml-4 flex h-full w-full max-w-[12.125rem] flex-col'>
            <h4 className='font-medium'>{image.name}</h4>
            <p>{formatFileSize(Number(image?.size))}</p>
            <div className='mb-2 mt-auto flex w-full items-center gap-3'>
              <div className='border-indigo/50 relative h-2 w-full overflow-hidden rounded-full border'>
                <span
                  className='bg-indigo absolute left-0 top-0 z-[-1] inline-block h-full transition-all duration-300'
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Button to delete the uploaded image */}
          <button type='button' onClick={handleDelete} className='ml-2 flex-shrink-0'>
            <Trash2Icon className='size-5' />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverUpload;
