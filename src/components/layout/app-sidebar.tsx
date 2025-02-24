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

// Menu items.
const items = [
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='~pt-6/10 ~px-5/8 ~pb-5/8'>
        <Image
          className='mx-auto max-w-[10.9rem]'
          src={images.logo}
          alt='Techinnover'
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='space-y-3'>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                className={cn(
                  sfPro.className,
                  '~text-sm/lg text-ash-200 ~px-3/5 ~py-3/5 hover:text-indigo flex items-center gap-5 rounded-r-md font-semibold uppercase transition-all duration-300',
                )}
                activeClassName='border-indigo bg-purple-mist text-indigo border-r-[6px] hover:text-indigo hover:bg-purple-mist'
                href={item.href}
              >
                <item.icon className='~size-4/6' />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
