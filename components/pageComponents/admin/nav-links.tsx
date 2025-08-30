"use client"
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

//# HEADER
const Links = [
  { name: 'Store', href: '/', icon: HomeIcon },
  {
    name: 'add product', href: '/admin/dashboard/products/create', icon: DocumentDuplicateIcon,
  },
  {
    name: 'Products', href: '/admin/dashboard/products', icon: DocumentDuplicateIcon,
  },
  {
    name: 'Orders', href: '/admin/dashboard/orders', icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/admin/dashboard/customers', icon: UserGroupIcon },
];



//SIDEBAR
const links = [
  { name: 'Home', href: '/admin/dashboard', icon: HomeIcon },
  {
    name: 'Invoices', href: '/admin/dashboard/invoices', icon: DocumentDuplicateIcon,
  },
  {
    name: 'Products', href: '/admin/dashboard/products', icon: DocumentDuplicateIcon,
  },
  {
    name: 'Orders', href: '/admin/dashboard/orders', icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/admin/dashboard/customers', icon: UserGroupIcon },
];


export  function NavLinksHeader() {
  const pathname = usePathname();
  return (
    <>
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
             
              'bg-sky-100 text-blue-600': pathname === link.href,
            }
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
             
              'bg-sky-100 text-blue-600': pathname === link.href,
            }
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

