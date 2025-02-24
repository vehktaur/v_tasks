'use client';

import { cn } from '@/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface DeadlineCalendarProps extends React.ComponentProps<'input'> {
  label?: string;
  name: string;
  placeholder?: string;
}

// DeadlineCalendar component: A date picker integrated with react-hook-form.
const DeadlineCalendar = ({ label, name }: DeadlineCalendarProps) => {
  // Extract errors from the form context.
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-start">
      {/* Render label if provided */}
      {label && (
        <label className="text-xs/sm mb-1.5 font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      {/* Controller handles the connection between the Calendar and form state */}
      <Controller
        name={name}
        render={({ field }) => (
          <Popover>
            {/* PopoverTrigger renders a button that displays the current or default date */}
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'input flex max-w-[13.7rem] items-center',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {/* Display the selected date in "PPP" format, or today's date if none is selected */}
                {field.value ? format(field.value, 'PPP') : <span>{format(new Date(), 'PPP')}</span>}
                <CalendarIcon className="ml-auto size-4 text-char" />
              </button>
            </PopoverTrigger>
            {/* PopoverContent contains the Calendar for date selection */}
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                // Disable dates prior to today.
                disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Render error message if present for this field */}
      {errors?.[name]?.message && (
        <p id={`${name}-error`} aria-live="polite" aria-atomic className="error">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default DeadlineCalendar;
