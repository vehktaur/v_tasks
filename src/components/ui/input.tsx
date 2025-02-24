'use client';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  name: string;
}

const Input = ({ className, type, label, name, ...props }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {label && (
        <label className='~text-xs/sm mb-1.5 font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <input
        aria-labelledby={`${name}-error`}
        id={name}
        type={type}
        className={cn(
          'input flex w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-[#333] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...register(name)}
        {...props}
      />

      {errors?.[name]?.message && (
        <p
          id={`${name}-error`}
          aria-live='polite'
          aria-atomic
          className='error'
        >
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
