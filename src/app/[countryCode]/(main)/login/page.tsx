import { Metadata } from "next"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 -mt-16 pt-16">
      {/* Mobile-first responsive layout */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          {/* Brand logo */}
          <div className="text-center">
            <a href="/" className="inline-flex items-center gap-2 font-medium text-xl sm:text-2xl">
              <div className="bg-primary text-primary-foreground flex size-7 sm:size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4 sm:size-5" />
              </div>
              <span className="text-gray-900 dark:text-white font-bold">Medusa Store</span>
            </a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login form card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50">
            <LoginForm />
          </div>

          {/* Footer links */}
          <div className="text-center space-y-3 sm:space-y-4 pb-4">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
              <a href="/privacy" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                Privacy Policy
              </a>
              <span className="hidden sm:inline mx-2">•</span>
              <a href="/terms" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                Terms of Service
              </a>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              © 2024 Medusa Store. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
