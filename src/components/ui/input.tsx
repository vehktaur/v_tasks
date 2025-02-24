'use client';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

// Extend the native input props with additional properties for our component.
interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  name: string;
}

// Input component integrated with react-hook-form.
// It displays an optional label, an input field, and shows validation errors.
const Input = ({ className, type, label, name, ...props }: InputProps) => {
  // Destructure the register function and errors from the form context.
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {/* Render the label if one is provided */}
      {label && (
        <label className='mb-1.5 font-medium ~text-xs/sm' htmlFor={name}>
          {label}
        </label>
      )}

      {/* Input field with react-hook-form registration */}
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

      {/* Render an error message if the field has a validation error */}
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
