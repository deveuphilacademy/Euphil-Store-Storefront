import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCustomer } from "@lib/data/customer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Key, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Security",
  description: "Manage your account security and authentication settings.",
}

export default async function Security() {
  const customer = await getCustomer()

  if (!customer) {
    notFound()
  }

  const loginHistory = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      time: "2 hours ago",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      time: "1 day ago",
      current: false,
    },
    {
      id: 3,
      device: "Chrome on MacBook",
      location: "Los Angeles, USA",
      time: "3 days ago",
      current: false,
    },
  ]

  return (
    <div className="space-y-8" data-testid="security-page-wrapper">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Security Settings</h2>
        <p className="text-gray-500 mt-1">
          Keep your account secure with these privacy and security settings
        </p>
      </div>

      {/* Security Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Account Security</CardTitle>
                <CardDescription>Your account security status</CardDescription>
              </div>
            </div>
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Secure
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            <Badge variant="secondary">Disabled</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Smartphone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  Protect your account with 2FA. You'll need to enter a code from your authenticator app when you sign in.
                </p>
              </div>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Password</CardTitle>
          <CardDescription>
            Update your password regularly to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                </div>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Login Activity</CardTitle>
          <CardDescription>
            Review recent sign-ins to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{login.device}</p>
                    <p className="text-sm text-gray-500">{login.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{login.time}</p>
                    </div>
                  </div>
                </div>
                {login.current && (
                  <Badge variant="secondary" className="text-xs">
                    Current Session
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-0 shadow-sm border-red-200">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
