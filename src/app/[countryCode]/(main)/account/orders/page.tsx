import { Metadata } from "next"
import OrdersClient from "./orders-client"
import { listOrders } from "@lib/data/orders"
import { getCustomer } from "@lib/data/customer"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders | Euphil Foods",
  description: "View your order history",
}

export default async function OrdersPage() {
  const customer = await getCustomer().catch(() => null)
  
  if (!customer) {
    notFound()
  }
  
  const orders = await listOrders().catch(() => null)
  
  return <OrdersClient orders={orders?.orders || []} />
}
