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
        className="text-lg font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/admin/dashboard/customers"
        className="text-lg font-medium  transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/admin/dashboard/products"
        className="text-lg font-medium  transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/admin/dashboard/orders"
        className="text-lg font-medium  transition-colors hover:text-primary"
      >
        Orders
      </Link>
    </nav>
  )
}
