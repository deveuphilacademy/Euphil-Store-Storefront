import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MapPin, User, CreditCard, ChevronRight, ShoppingBag, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  const totalOrders = orders?.length || 0
  const totalSpent = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0
  
  const getOrderStatus = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Pending", variant: "secondary" },
      processing: { label: "Processing", variant: "default" },
      shipped: { label: "Shipped", variant: "default" },
      delivered: { label: "Delivered", variant: "outline" },
      cancelled: { label: "Cancelled", variant: "destructive" },
    }
    return statusMap[status] || { label: status, variant: "default" }
  }

  return (
    <div className="space-y-8" data-testid="overview-page-wrapper">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900" data-testid="welcome-message">
          Welcome back, {customer?.first_name}! 👋
        </h2>
        <p className="text-gray-500 mt-1">Here's what's happening with your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-gray-500 mt-1">Lifetime purchases</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders?.[0] ? convertToLocale({
                amount: totalSpent,
                currency_code: orders[0].currency_code,
              }) : "$0.00"}
            </div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Saved Addresses</CardTitle>
            <MapPin className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="addresses-count">
              {customer?.addresses?.length || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">Shipping locations</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Profile Status</CardTitle>
            <User className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="customer-profile-completion">
              {profileCompletion}%
            </div>
            <Progress value={profileCompletion} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account with these shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LocalizedClientLink href="/account/profile">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account/addresses">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <MapPin className="mr-2 h-4 w-4" />
                Manage Addresses
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account/orders">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Package className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account/payment">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
            </LocalizedClientLink>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest purchases</CardDescription>
            </div>
            {orders && orders.length > 0 && (
              <LocalizedClientLink href="/account/orders">
                <Button variant="ghost" size="sm">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </LocalizedClientLink>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {orders && orders.length > 0 ? (
            <div className="space-y-4" data-testid="orders-wrapper">
              {orders.slice(0, 5).map((order) => {
                const status = getOrderStatus(order.status || "pending")
                return (
                  <LocalizedClientLink
                    key={order.id}
                    href={`/account/orders/details/${order.id}`}
                    data-testid="order-wrapper"
                    data-value={order.id}
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900" data-testid="order-id">Order #{order.display_id}</p>
                          <p className="text-sm text-gray-500" data-testid="order-created-date">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="sm:text-center">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-sm font-medium text-gray-900" data-testid="order-amount">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.items?.length || 0} items
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                    </div>
                  </LocalizedClientLink>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500" data-testid="no-orders-message">
                Start shopping to see your orders here.
              </p>
              <div className="mt-6">
                <LocalizedClientLink href="/store">
                  <Button>
                    Browse Products
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
