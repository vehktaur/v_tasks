import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import images from '@/assets/images';
import Link from 'next/link';
import { CalendarIcon } from '@/assets/svgs';
import NavLink from '../ui/nav-link';
import { cn } from '@/lib/utils';
import sfPro from '../../../public/fonts/sf-pro';

// Menu items.
const items = [
  {
    title: 'Todo List',
    href: '/',
    icon: CalendarIcon,
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
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                className={cn(
                  sfPro.className,
                  '~text-sm/lg text-ash ~px-3/5 ~py-3/5 hover:text-indigo hover:bg-purple-mist flex items-center gap-5 font-semibold uppercase transition-all duration-300',
                )}
                activeClassName='border-indigo bg-purple-mist text-indigo border-r-[6px] '
                href={item.href}
              >
                <item.icon />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
