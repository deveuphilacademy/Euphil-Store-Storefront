import { getCustomer } from "@lib/data/customer"
import KindeAccountLayout from "@modules/account/templates/kinde-account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await getCustomer().catch(() => null)

  return (
    <KindeAccountLayout customer={customer}>
      {customer ? dashboard : login}
    </KindeAccountLayout>
  )
}
