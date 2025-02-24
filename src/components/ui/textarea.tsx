'use client';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

// Define props for Textarea by extending the native textarea attributes.
interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string | React.ReactNode;
  name: string;
}

// Textarea component integrated with react-hook-form.
// It renders an optional label, a styled textarea, and displays validation errors.
const Textarea = ({ className, label, name, ...props }: TextareaProps) => {
  // Destructure register function and form errors from the form context.
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {/* Render label if provided */}
      {label && (
        <label className='mb-1.5 font-medium ~text-xs/sm' htmlFor={name}>
          {label}
        </label>
      )}

      {/* Textarea element registered with react-hook-form */}
      <textarea
        aria-labelledby={`${name}-error`}
        id={name}
        className={cn(
          'input flex w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-[#333] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...register(name)}
        {...props}
      />

      {/* Render validation error message if exists */}
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

export default Textarea;
