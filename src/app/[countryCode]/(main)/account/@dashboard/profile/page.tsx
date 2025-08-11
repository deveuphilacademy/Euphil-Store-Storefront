import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Euphil Store profile.",
}

export default async function Profile() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="space-y-8" data-testid="profile-page-wrapper">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Profile Settings</h2>
        <p className="text-gray-500 mt-1">
          Manage your personal information and account preferences
        </p>
      </div>
      
      <div className="space-y-6">
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        <ProfilePassword customer={customer} />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}
