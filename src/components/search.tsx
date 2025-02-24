'use client';

import { cn } from '@/lib/utils';
import { SearchIcon } from '@/assets/svgs';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ className }: { className: string }) => {
  // Get the 'replace' function from the router to update query parameters.
  const { replace } = useRouter();
  // Retrieve the current pathname.
  const pathname = usePathname();
  // Retrieve current search parameters.
  const searchParams = useSearchParams();

  // Create a query string based on the provided search value.
  const createQueryString = useCallback(
    (search: string) => {
      // Initialize URLSearchParams with current search parameters.
      const params = new URLSearchParams(searchParams.toString());

      // If the search input is empty, remove the 'search' parameter.
      // Otherwise, set/update the 'search' parameter to the lowercase value.
      if (search === '') {
        params.delete('search');
      } else {
        params.set('search', search.toLowerCase());
      }

      // Return the updated query string.
      return params.toString();
    },
    [searchParams]
  );

  // Update the URL search parameters without scrolling the page.
  const updateSearchParam = (search: string) => {
    replace(`${pathname}?${createQueryString(search)}`, {
      scroll: false,
    });
  };

  return (
    <div className={cn('relative', className)}>
      {/* Positioned search icon inside the input field */}
      <span className="absolute inset-y-0 left-1.5 content-center">
        <SearchIcon className="text-ash-200 size-6" />
      </span>
      {/* Input field that updates the URL's 'search' parameter on change */}
      <input
        className="input py-2 ps-8"
        type="text"
        name="search"
        onChange={(e) => updateSearchParam(e.target.value)}
        placeholder="Search"
        defaultValue={searchParams.get('search')?.toString() || ''}
      />
    </div>
  );
};

export default Search;
