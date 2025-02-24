'use client';

import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { TimeIcon } from '@/assets/svgs';

// Define the props for the TimeSelect component.
interface TimeSelectProps extends React.ComponentProps<'select'> {
  label?: string;
  name: string;
  options: string[];
  placeholder?: string;
}

// TimeSelect component: A select dropdown integrated with react-hook-form
// that displays time options along with a time icon.
const TimeSelect = ({
  className,
  label,
  name,
  options,
  placeholder,
  ...props
}: TimeSelectProps) => {
  // Get register and error state from react-hook-form context.
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {/* Render label if provided */}
      {label && (
        <label className='text-xs/sm mb-1.5 font-medium' htmlFor={name}>
          {label}
        </label>
      )}

      {/* Connect the select component with react-hook-form using Controller */}
      <Controller
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* SelectTrigger displays the selected value and a time icon */}
            <SelectTrigger
              className={cn(
                'input flex w-full max-w-[13.6rem] bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50',
                className,
              )}
              icon={<TimeIcon />}
            >
              {/* SelectValue shows the current value or placeholder */}
              <SelectValue
                id={name}
                {...register(name)}
                {...props}
                placeholder={placeholder}
              >
                {field.value}
              </SelectValue>
            </SelectTrigger>
            {/* Render dropdown list with time options */}
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className='hover:bg-zinc-100'
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* Display error message if field has a validation error */}
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

export default TimeSelect;
