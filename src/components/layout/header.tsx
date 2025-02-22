import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import { SidebarTrigger } from '../ui/sidebar';

const Header = () => {
  return (
    <header className='~pt-6/10 ~pb-5/8 padding-inline sticky top-0 flex items-center justify-between'>
      <div
        className={cn(sfPro.className, 'flex items-center gap-5 font-semibold')}
      >
        <SidebarTrigger />
        <h2 className='~text-lg/3xl'>22 February 2025</h2>
      </div>

      <input type='text' name='search' id='search' />
    </header>
  );
};
export default Header;
