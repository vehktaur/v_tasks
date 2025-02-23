import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PriorityColors = (priority: string) => ({
  'bg-[#EBFAE2] text-[#4F9C20]': priority === 'high',
  'bg-[#FDF2F2] text-[#EC5962]': priority === 'low',
  'bg-[#EEF3FF] text-[#3069FE]': priority === 'medium',
});

export const PriorityColorsHover = (priority: string) => ({
  'hover:bg-[#EBFAE2] text-[#4F9C20]': priority === 'high',
  'hover:bg-[#FDF2F2] text-[#EC5962]': priority === 'low',
  'hover:bg-[#EEF3FF] text-[#3069FE]': priority === 'medium',
});
