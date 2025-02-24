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

interface CoverUploadProps {
  className?: string;
  label?: string | React.ReactNode;
  name: string;
  image: Partial<ImageFile>;
  setImage: Dispatch<SetStateAction<Partial<ImageFile>>>;
}

const CoverUpload = ({
  className,
  label,
  name,
  image,
  setImage,
}: CoverUploadProps) => {
  const { edgestore } = useEdgeStore();

  const [progress, setProgress] = useState(() => (image.url ? 100 : 0));

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) {
      return;
    }

    // Check if the file is an image using a regular expression
    if (!image.type.match(/^image\//)) {
      toast.error('Image files only');
      return;
    }

    const preview = URL.createObjectURL(image);

    try {
      const uploadedImg = await edgestore.taskCovers.upload({
        file: image,
        options: {
          temporary: true,
        },
        onProgressChange(progress) {
          setProgress(progress);
        },
      });

      setImage((prev) => ({
        ...prev,
        name: image.name,
        image,
        url: uploadedImg.url,
        preview,
        size: image.size.toString(),
      }));
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message.replace('3145728', '3MB')
          : 'Something went wrong please try again',
        { position: 'top-center' },
      );
    }
  };

  const handleDelete = async () => {
    const res = await deleteCoverImage(image.url);

    if (res.success) {
      toast.success(res.msg);
      setImage({});
      setProgress(0)
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className={cn('grid w-full items-start', className)}>
      {label && <h3 className='~text-xs/sm mb-1.5 font-medium'>{label}</h3>}

      {!image.url && (
        <>
          <label className='input min-h-[7.8rem] cursor-pointer p-4'>
            <div className='grid place-items-center gap-3'>
              <div className='grid size-10 place-items-center rounded-full border-[6px] border-[#F9FAFB] bg-[#F2F4F7]'>
                <UploadCloudIcon />
              </div>

              <p className='text-center text-[#667085]'>
                <span className='font-medium text-[#6941C6]'>
                  Click to upload
                </span>{' '}
                or drag and drop <br />
                <span className='text-xs'>PNG or JPG</span>
              </p>

              {progress > 0 && <p className='text-xs'>Uploading...</p>}
            </div>

            <input
              aria-labelledby={`${name}-error`}
              type='file'
              onChange={handleChange}
              hidden
            />
          </label>
        </>
      )}

      {image.url && (
        <>
          <div className='input flex min-h-[7.8rem] cursor-pointer items-center p-4'>
            <div className='h-full w-full max-w-[11.69rem] overflow-hidden rounded-lg'>
              <Image
                className='size-full object-cover'
                src={image.url}
                alt={image.name ?? ''}
                width={980}
                height={480}
              />
            </div>

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

            <button
              type='button'
              onClick={handleDelete}
              className='ml-2 flex-shrink-0'
            >
              <Trash2Icon className='size-5' />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoverUpload;
