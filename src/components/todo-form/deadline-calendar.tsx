'use client';

import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface DeadlineCalendarProps extends React.ComponentProps<'input'> {
  label?: string;
  name: string;
  placeholder?: string;
}

const DeadlineCalendar = ({
  className,
  label,
  name,
  placeholder,
}: DeadlineCalendarProps) => {
  const {
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
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'input flex max-w-[13.7rem] items-center',
                  !field.value && 'text-muted-foreground',
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>{format(new Date(), 'PPP')}</span>
                )}
                <CalendarIcon className='ml-auto size-4 text-char' />
              </button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date.getTime() < new Date().setHours(0, 0, 0, 0)
                }
              />
            </PopoverContent>
          </Popover>
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

export default DeadlineCalendar;
