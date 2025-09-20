import { cn } from "@/lib/db/essentials/utils"
import Link from "next/link"



export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className="text-lg font-medium transition-colors hover:text-primary hover:bg-amber-600 rounded-xl p-1.5"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard/customers"
        className="text-lg font-medium  transition-colors hover:text-primary  hover:bg-amber-600 rounded-xl p-1.5"
      >
        Customers
      </Link>
      <Link
        href="/admin/dashboard/products"
        className="text-lg font-medium  transition-colors hover:text-primary  hover:bg-amber-600 rounded-xl p-1.5"
      >
        Products
      </Link>
      <Link
        href="/admin/dashboard/orders"
        className="text-lg font-medium  transition-colors hover:text-primary  hover:bg-amber-600 rounded-xl p-1.5"
      >
        Orders
      </Link>
    </nav>
  )
}
