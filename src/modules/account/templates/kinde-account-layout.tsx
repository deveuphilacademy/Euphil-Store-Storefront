"use client"

import React from "react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Loader2 } from "lucide-react"
import AccountLayout from "./account-layout"
import { HttpTypes } from "@medusajs/types"

interface KindeAccountLayoutProps {
  children: React.ReactNode
  customer: HttpTypes.StoreCustomer | null
}

const KindeAccountLayout: React.FC<KindeAccountLayoutProps> = ({
  children,
  customer,
}) => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <AccountLayout customer={customer}>
        {children}
      </AccountLayout>
    </ProtectedRoute>
  )
}

export default KindeAccountLayout
