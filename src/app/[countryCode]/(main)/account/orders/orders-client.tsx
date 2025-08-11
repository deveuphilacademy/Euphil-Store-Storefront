"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Package, Truck } from "lucide-react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface Order {
  id: string
  display_id: number
  created_at: string
  status: string
  total: number
  currency_code: string
  shipping_address?: {
    address_1?: string
    city?: string
    postal_code?: string
    country_code?: string
  }
  items?: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
  }>
}

interface OrdersClientProps {
  orders: Order[]
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "requires_action":
        return "destructive"
      case "canceled":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Package className="h-4 w-4" />
      case "pending":
        return <Truck className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground text-center">
            When you place your first order, it will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link href={`/account/orders/${order.id}`} key={order.id}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.display_id}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(order.created_at)}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.shipping_address && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div>
                      {order.shipping_address.address_1 && <p>{order.shipping_address.address_1}</p>}
                      <p>
                        {order.shipping_address.city && `${order.shipping_address.city}, `}
                        {order.shipping_address.postal_code}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}
                  </div>
                  <div className="text-lg font-semibold">
                    {order.currency_code?.toUpperCase()} {(order.total / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
