import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCustomer } from "@lib/data/customer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Payment Methods",
  description: "Manage your payment methods and billing information.",
}

export default async function PaymentMethods() {
  const customer = await getCustomer()

  if (!customer) {
    notFound()
  }

  return (
    <div className="space-y-8" data-testid="payment-methods-page-wrapper">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Payment Methods</h2>
        <p className="text-gray-500 mt-1">
          Manage your saved payment methods for faster checkout
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Saved Cards</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a payment method to make checkout faster and easier.
            </p>
            <div className="mt-6">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
