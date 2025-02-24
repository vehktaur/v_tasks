// Import required utilities and components.
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Today from '../today';
import Search from '../search';
import { Suspense } from 'react';

// Header component renders the top navigation bar.
const Header = () => {
  return (
    <header className='padding-inline sticky top-0 z-50 mb-8 flex flex-col bg-white shadow-sm ~gap-4/8 ~pt-6/10 ~pb-5/8 sm:flex-row sm:items-center sm:justify-between md:mb-0 md:shadow-none'>
      {/* Left section: Sidebar trigger and current day display */}
      <div
        className={cn(
          sfPro.className,
          'flex items-center font-semibold ~gap-3/5',
        )}
      >
        {/* Sidebar toggle button visible only on small screens */}
        <SidebarTrigger className='md:hidden' />
        {/* Display today's date or title */}
        <h2 className='flex-shrink-0 ~text-base/2xl'>
          <Today />
        </h2>
      </div>
      {/* Right section: Search bar */}
      <Suspense>
        <Search className='ml-auto' />
      </Suspense>
      
    </header>
  );
};

export default Header;
