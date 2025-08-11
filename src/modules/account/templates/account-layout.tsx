import React from "react"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { Card } from "@/components/ui/card"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50/50" data-testid="account-page">
      <div className="content-container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">My Account</h1>
          <p className="text-gray-500 mt-2">Manage your profile, orders, and preferences</p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {customer && <AccountNav customer={customer} />}
          </div>
          
          {/* Content Area */}
          <Card className="p-6 lg:p-8 shadow-sm border-0 bg-white">
            {children}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
