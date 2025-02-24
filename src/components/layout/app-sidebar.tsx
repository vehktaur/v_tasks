// Import necessary components, libraries, and assets.
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import images from '@/assets/images';
import { IoCalendarOutline as CalendarIcon } from 'react-icons/io5';
import NavLink from '@/components/ui/nav-link';
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';
import { SettingsIcon } from 'lucide-react';

// Define the sidebar menu items with titles, routes, and icons.
const menuItems = [
  {
    title: 'Todo List',
    href: '/',
    icon: CalendarIcon,
  },
  {
    title: 'Settings',
    href: '#',
    icon: SettingsIcon,
  },
];

// AppSidebar component renders the sidebar with a header and a menu.
export function AppSidebar() {
  return (
    <Sidebar>
      {/* Sidebar header containing the logo */}
      <SidebarHeader className='~px-5/8 ~pt-6/10 ~pb-5/8'>
        <Image
          className='mx-auto max-w-[10.9rem]'
          src={images.logo}
          alt='Techinnover'
        />
      </SidebarHeader>

      {/* Sidebar content with a menu of navigation links */}
      <SidebarContent>
        <SidebarMenu className='space-y-3'>
          {menuItems.map(({ title, href, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              <NavLink
                className={cn(
                  sfPro.className,
                  'flex items-center gap-5 rounded-r-md font-semibold uppercase text-ash-200 transition-all duration-300 ~text-sm/lg ~px-3/5 ~py-3/5 hover:text-indigo',
                )}
                activeClassName='border-indigo bg-purple-mist text-indigo border-r-[6px] hover:text-indigo hover:bg-purple-mist'
                href={href}
              >
                {/* Render the icon component */}
                <Icon className='~size-4/6' />
                <span>{title}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
