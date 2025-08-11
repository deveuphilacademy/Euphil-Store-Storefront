"use client"

import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ProfileSection } from "../profile-section"

import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [isLoading, setIsLoading] = useState(false)

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    setIsLoading(true)
    const customerData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomer(customerData)
      setIsLoading(false)
      return { success: true, error: null }
    } catch (error: any) {
      setIsLoading(false)
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useFormState(updateCustomerName, {
    error: false,
    success: false,
  })

  return (
    <ProfileSection
      title="Personal Information"
      description="Update your name and personal details"
      isSuccess={state.success}
      isError={!!state.error}
      errorMessage={state.error?.toString()}
      showSaveButton={false}
    >
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name"
              defaultValue={customer.first_name ?? ""}
              placeholder="Enter your first name"
              required
              data-testid="first-name-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name"
              defaultValue={customer.last_name ?? ""}
              placeholder="Enter your last name"
              required
              data-testid="last-name-input"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </ProfileSection>
  )
}

export default ProfileName
