"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"
import { User, MapPin, Package, CreditCard, Bell, Shield, LogOut, ChevronRight, LayoutDashboard } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const navItems = [
    {
      href: "/account",
      label: "Dashboard",
      icon: LayoutDashboard,
      testId: "overview-link",
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: Package,
      testId: "orders-link",
    },
    {
      href: "/account/profile",
      label: "Profile",
      icon: User,
      testId: "profile-link",
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      icon: MapPin,
      testId: "addresses-link",
    },
    {
      href: "/account/payment",
      label: "Payment Methods",
      icon: CreditCard,
      testId: "payment-link",
    },
    {
      href: "/account/notifications",
      label: "Notifications",
      icon: Bell,
      testId: "notifications-link",
    },
    {
      href: "/account/security",
      label: "Security",
      icon: Shield,
      testId: "security-link",
    },
  ]

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="p-6 shadow-sm border-0">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-medium">
              {customer?.first_name?.charAt(0) || "U"}
              {customer?.last_name?.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {customer?.first_name} {customer?.last_name}
            </h2>
            <p className="text-sm text-gray-500">{customer?.email}</p>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <Card className="shadow-sm border-0 overflow-hidden">
        <nav className="divide-y divide-gray-100">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = route?.endsWith(item.href)
            
            return (
              <LocalizedClientLink
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors",
                  isActive && "bg-blue-50 hover:bg-blue-50"
                )}
                data-testid={item.testId}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-blue-600" : "text-gray-700"
                  )}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </LocalizedClientLink>
            )
          })}
          
          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-between px-6 py-4 hover:bg-red-50 transition-colors w-full text-left"
            data-testid="logout-button"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 text-red-600">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="font-medium text-red-600">Log out</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </nav>
      </Card>
    </div>
  )
}

export default AccountNav
