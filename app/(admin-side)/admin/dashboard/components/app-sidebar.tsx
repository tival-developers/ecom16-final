'use client'

import * as React from 'react'
import {
  Book,
  Globe,
  LaptopIcon,
  LayoutDashboardIcon,
  ListOrdered,
  User2,
  UserPenIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from './nav-main'

import { NavUser } from './nav-user'
import { ArrowTrendingUpIcon } from '@heroicons/react/20/solid'
import CompanyLogo from '@/components/shared/Brand-logo'

const data = {
  user: {
    name: 'Admin',
    email: 'admin@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Analytics',
      url: '/admin/dashboard',
      icon: LayoutDashboardIcon,
      
    },
    {
      title: 'Products Dashboard',
      url: '/admin/dashboard/products',
      icon: LaptopIcon,

      items: [
        {
          title: 'View Products',
          url: '/admin/dashboard/products',
        },
        {
          title: 'Add Product',
          url: '/admin/dashboard/products/create',
        },
        {
          title: 'Reviews',
          url: '/admin/dashboard/products/reviews',
        },

        {
          title: 'Categories',
          url: '/admin/dashboard/products/product-categories',
        },
      ],
    },
    {
      title: 'Customers Dashboard',
      url: '/admin/dashboard/customers',
      icon: User2,
      items: [
        {
          title: 'View Customers',
          url: '/admin/dashboard/customers',
        },
      ],
    },
    {
      title: 'Admins Dashboard',
      url: '/admin/dashboard/admins',
      icon: UserPenIcon,
      items: [
        {
          title: 'View Admins',
          url: '/admin/dashboard/admins',
        },
        {
          title: 'Create Admin',
          url: '/admin/dashboard/admins/create',
        },
      ],
    },
    {
      title: 'Products Promotion',
      url: '/admin/dashboard/promotions/discount',
      icon: ArrowTrendingUpIcon,
      items: [
        {
          title: 'Discounts',
          url: '/admin/dashboard/promotions/discount',
        },

        {
          title: 'Flashsales',
          url: '/admin/dashboard/promotions/flashsale',
        },
      ],
    },

    {
      title: 'Blogs',
      url: '/admin/dashboard/blogs',
      icon: Book,
      items: [
        {
          title: 'View Blogs',
          url: '/admin/dashboard/blogs',
        },

        {
          title: 'Add Blogs',
          url: '/admin/dashboard/blogs/create',
        },
      ],
    },
    {
      title: 'Banners',
      url: '/admin/dashboard/banners',
      icon: Globe,
      items: [
        {
          title: ' view Banners',
          url: '/admin/dashboard/banners',
        },

        {
          title: 'Create Banners',
          url: '/admin/dashboard/site-layout/banners/create',
        },
      ],
    },
    {
      title: 'Orders',
      url: '/admin/dashboard/orders',
      icon: ListOrdered,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className=' bg-yellow-600'>
      <Sidebar
        className='top-[--header-height] !h-[calc(100svh-var(--header-height))]'
        {...props}
      >
        <SidebarHeader className='mt-17'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild>
                <div>
                  <CompanyLogo />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
