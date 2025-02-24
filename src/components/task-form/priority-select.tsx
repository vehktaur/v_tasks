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

// Define the props for the PrioritySelect component.
interface PrioritySelectProps extends React.ComponentProps<'select'> {
  label?: string;
  name: string;
  options: string[];
  placeholder?: string;
}

// PrioritySelect renders a custom select input integrated with react-hook-form.
const PrioritySelect = ({
  className,
  label,
  name,
  options,
  placeholder,
  ...props
}: PrioritySelectProps) => {
  // Get the register function and form errors from the form context.
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-start">
      {/* Render the label if provided */}
      {label && (
        <label className="text-xs/sm mb-1.5 font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      {/* Use Controller to bind the Select component to form state */}
      <Controller
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            {/* SelectTrigger wraps the SelectValue and applies custom styling */}
            <SelectTrigger
              className={cn(
                'input flex w-full bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50',
                className
              )}
            >
              <SelectValue
                id={name}
                {...register(name)}
                {...props}
                placeholder={placeholder}
              >
                {/* Render the selected value with conditional background colors */}
                <div
                  className={cn(
                    '~text-xs/[0.8rem] rounded px-2 py-1 font-medium capitalize',
                    {
                      'bg-[#EBFAE2] text-[#4F9C20]': field.value === 'high',
                      'bg-[#FDF2F2] text-[#EC5962]': field.value === 'low',
                      'bg-[#EEF3FF] text-[#3069FE]': field.value === 'medium',
                    }
                  )}
                >
                  {field.value}
                </div>
              </SelectValue>
            </SelectTrigger>
            {/* Render the dropdown content with each option styled based on its value */}
            <SelectContent className="max-w-48 capitalize">
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className={cn({
                    'text-[#4F9C20] hover:bg-[#EBFAE2]': option === 'high',
                    'text-[#EC5962] hover:bg-[#FDF2F2]': option === 'low',
                    'text-[#3069FE] hover:bg-[#EEF3FF]': option === 'medium',
                  })}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {/* Display an error message if validation fails for this field */}
      {errors?.[name]?.message && (
        <p
          id={`${name}-error`}
          aria-live="polite"
          aria-atomic
          className="error"
        >
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default PrioritySelect;
