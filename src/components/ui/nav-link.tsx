'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

// Extend the native LinkProps with custom props for active styling and exact matching.
interface NavLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  children: ReactNode;
}

// NavLink component renders a Next.js Link with active class styling based on the current path.
const NavLink = ({
  className,
  activeClassName,
  children,
  exact = false,
  ...props
}: NavLinkProps) => {
  // Get the current pathname from Next.js navigation.
  const pathname = usePathname();

  // Determine if the link is active:
  // - When 'exact' is true, the pathname must match exactly.
  // - Otherwise, the pathname only needs to start with the link's href.
  const isActive = exact
    ? pathname === props.href
    : pathname.startsWith(String(props.href));

  return (
    <Link {...props} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
};

export default NavLink;
