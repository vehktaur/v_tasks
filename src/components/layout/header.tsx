import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search } from 'lucide-react';
import { SearchIcon } from '@/assets/svgs';
import Today from '../today';

const Header = () => {
  return (
    <header className='~pt-6/10 ~pb-5/8 padding-inline sticky top-0 z-50 flex items-center justify-between gap-8 bg-white'>
      <div
        className={cn(
          sfPro.className,
          '~gap-3/5 flex items-center font-semibold',
        )}
      >
        <SidebarTrigger />
        <h2 className='~text-base/3xl flex-shrink-0'>
          <Today />
        </h2>
      </div>

      <div className='relative'>
        <span className='absolute inset-y-0 left-1.5 content-center'>
          <SearchIcon className='text-ash-200 size-6' />
        </span>
        <input
          className='input py-2 ps-8'
          type='text'
          name='search'
          placeholder='Search'
        />
      </div>
    </header>
  );
};
export default Header;
