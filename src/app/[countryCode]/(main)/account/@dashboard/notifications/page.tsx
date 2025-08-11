import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCustomer } from "@lib/data/customer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Mail, ShoppingCart, Package, Bell, Megaphone, Gift } from "lucide-react"

export const metadata: Metadata = {
  title: "Notifications",
  description: "Manage your notification preferences and email settings.",
}

export default async function Notifications() {
  const customer = await getCustomer()

  if (!customer) {
    notFound()
  }

  const notificationSettings = [
    {
      id: "order-updates",
      title: "Order Updates",
      description: "Get notified about order confirmations, shipping updates, and delivery",
      icon: Package,
      enabled: true,
    },
    {
      id: "promotional",
      title: "Promotional Emails",
      description: "Receive exclusive offers, sales announcements, and new product alerts",
      icon: Megaphone,
      enabled: false,
    },
    {
      id: "cart-reminders",
      title: "Cart Reminders",
      description: "Remind me about items left in my cart",
      icon: ShoppingCart,
      enabled: true,
    },
    {
      id: "rewards",
      title: "Rewards & Points",
      description: "Updates about your loyalty points and rewards",
      icon: Gift,
      enabled: true,
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Weekly digest with featured products and store updates",
      icon: Mail,
      enabled: false,
    },
  ]

  return (
    <div className="space-y-8" data-testid="notifications-page-wrapper">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Notification Preferences</h2>
        <p className="text-gray-500 mt-1">
          Choose how you want to be notified about your orders and updates
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Email Notifications</CardTitle>
          <CardDescription>
            We'll always send you important updates about your orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {notificationSettings.map((setting) => {
              const Icon = setting.icon
              return (
                <div key={setting.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={setting.id} className="font-medium">
                        {setting.title}
                      </Label>
                      <Switch id={setting.id} defaultChecked={setting.enabled} />
                    </div>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Push Notifications</CardTitle>
          <CardDescription>
            Get instant updates on your mobile device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="push-notifications" className="font-medium">
                Enable Push Notifications
              </Label>
              <p className="text-sm text-gray-500">
                Receive real-time updates about your orders and exclusive offers
              </p>
            </div>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
