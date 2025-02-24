import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import { SidebarTrigger } from '@/components/ui/sidebar';

import Today from '../today';
import Search from '../search';

const Header = () => {
  return (
    <header className='~pt-6/10 ~pb-5/8 padding-inline ~gap-4/8 sticky top-0 z-50 mb-8 flex flex-col bg-white shadow-sm sm:flex-row sm:items-center sm:justify-between md:mb-0 md:shadow-none'>
      <div
        className={cn(
          sfPro.className,
          '~gap-3/5 flex items-center font-semibold',
        )}
      >
        <SidebarTrigger className='md:hidden' />
        <h2 className='~text-base/2xl flex-shrink-0'>
          <Today />
        </h2>
      </div>

      <Search className='ml-auto' />
    </header>
  );
};
export default Header;
