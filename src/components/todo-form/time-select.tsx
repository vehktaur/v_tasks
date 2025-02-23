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

interface TimeSelectProps extends React.ComponentProps<'select'> {
  label?: string;
  name: string;
  options: string[];
  placeholder?: string;
}

const TimeSelect = ({
  className,
  label,
  name,
  options,
  placeholder,
  ...props
}: TimeSelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='grid w-full items-start'>
      {label && (
        <label className='text-xs/sm mb-1.5 font-medium' htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className={cn(
                'input flex w-full bg-transparent max-w-[13.6rem] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50',
                className,
              )}
              icon={<TimeIcon />}
            >
              {
                <SelectValue
                  id={name}
                  {...register(name)}
                  {...props}
                  placeholder={placeholder}
                />
              }
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem className='hover:bg-zinc-100' key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

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

export default TimeSelect;
