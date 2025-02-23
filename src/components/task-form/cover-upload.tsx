'use client';

import { UploadCloudIcon } from '@/assets/svgs';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface CoverUploadProps extends React.ComponentProps<'input'> {
  label?: string | React.ReactNode;
  name: string;
}

const CoverUpload = ({
  className,
  label,
  name,
  ...props
}: CoverUploadProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {label && <h3 className='~text-xs/sm mb-1.5 font-medium'>{label}</h3>}

      <label className='input cursor-pointer p-4 min-h-[7.8rem]'>
        <div className='grid place-items-center gap-3'>
          <div className='grid size-10 place-items-center rounded-full border-[6px] border-[#F9FAFB] bg-[#F2F4F7]'>
            <UploadCloudIcon />
          </div>

          <p className='text-center text-[#667085]'>
            <span className='font-medium text-[#6941C6]'>Click to upload</span>{' '}
            or drag and drop <br />
            <span className='text-xs'>PNG or JPG</span>
          </p>
        </div>

        <input
          aria-labelledby={`${name}-error`}
          type='file'
          {...register(name)}
          {...props}
          hidden
        />
      </label>

      {errors?.[name]?.message && (
        <p
          id={`${name}-error`}
          aria-live='polite'
          aria-atomic
          className='error mt-2 ps-1'
        >
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default CoverUpload;
