'use client';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/assets/svgs';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ className }: { className: string }) => {
  const { replace } = useRouter(); // replace to set the query params
  const pathname = usePathname();
  const searchParams = useSearchParams(); // get current searchParams

  const createQueryString = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (search === '') {
        params.delete('search');
      } else {
        params.set('search', search.toLowerCase());
      }

      return params.toString();
    },
    [searchParams],
  );

  const updateSearchParam = (search: string) => {
    replace(`${pathname}?${createQueryString(search)}`, {
      scroll: false,
    });
  };

  return (
    <div className={cn('relative', className)}>
      <span className='absolute inset-y-0 left-1.5 content-center'>
        <SearchIcon className='text-ash-200 size-6' />
      </span>
      <input
        className='input py-2 ps-8'
        type='text'
        name='search'
        onChange={(e) => updateSearchParam(e.target.value)}
        placeholder='Search'
        defaultValue={searchParams.get('search')?.toString() || ''}
      />
    </div>
  );
};
export default Search;
