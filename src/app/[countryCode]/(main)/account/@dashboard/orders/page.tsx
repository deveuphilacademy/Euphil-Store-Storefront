import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="space-y-8" data-testid="orders-page-wrapper">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <p className="text-gray-500 mt-1">
          Track your orders and manage returns or exchanges
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
