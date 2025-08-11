import { Metadata } from "next"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Euphil Store account.",
}

export default function Login() {
  return (
    <div className="min-h-[600px] flex items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Welcome Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Euphil Foods</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your account and manage your orders
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Kinde Login Button */}
            <LoginLink>
              <Button className="w-full h-12 text-base" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Sign in with Email
              </Button>
            </LoginLink>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            {/* Register Link */}
            <RegisterLink>
              <Button variant="outline" className="w-full h-12 text-base" size="lg">
                <User className="mr-2 h-5 w-5" />
                Create new account
              </Button>
            </RegisterLink>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <ShieldCheck className="h-4 w-4" />
          <span>Your data is secure and encrypted</span>
        </div>

        {/* Benefits */}
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Why create an account?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Track your orders and delivery status
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Save your addresses for faster checkout
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                View your order history and reorder easily
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Get exclusive offers and early access to sales
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
