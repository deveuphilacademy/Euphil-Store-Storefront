import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, ArrowLeft, Shield, Truck } from "lucide-react"
import Link from "next/link"

import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const ModernCartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingBag className="h-8 w-8" />
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {cart?.items?.length || 0} items in your cart
              </p>
            </div>
            <Link href="/store">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {!customer && (
                <Card className="mb-4">
                  <CardContent className="py-4">
                    <SignInPrompt />
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ItemsTemplate items={cart?.items} />
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="py-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Truck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Free Delivery</p>
                        <p className="text-xs text-gray-600">Orders over ₦50,000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Secure Payment</p>
                        <p className="text-xs text-gray-600">100% Protected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Quality Guaranteed</p>
                        <p className="text-xs text-gray-600">Fresh Products</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              {cart && cart.region && (
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Summary cart={cart as any} />
                    </CardContent>
                  </Card>

                  {/* Promo Code */}
                  <Card className="mt-4">
                    <CardContent className="py-4">
                      <p className="text-sm font-medium mb-2">Have a promo code?</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        />
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12">
              <EmptyCartMessage />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ModernCartTemplate
