import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFileSize = (sizeInBytes?: number): string => {
  const KB = 1024;
  const MB = KB * 1024;

  if (!sizeInBytes) return '';

  return sizeInBytes < MB
    ? `${Math.round(sizeInBytes / KB)} KB`
    : `${(sizeInBytes / MB).toFixed(2)} MB`;
};
