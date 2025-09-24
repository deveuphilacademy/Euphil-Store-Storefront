"use client"

import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "../../../components/auth/login-form"
import { SignupForm } from "../../../components/auth/signup-form"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

type ModernLoginTemplateProps = {
  setCurrentView?: (view: LOGIN_VIEW) => void
}

const ModernLoginTemplate = ({ setCurrentView }: ModernLoginTemplateProps) => {
  const [currentView, setView] = useState(LOGIN_VIEW.SIGN_IN)

  const handleViewChange = (view: LOGIN_VIEW) => {
    setView(view)
    setCurrentView?.(view)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
              {currentView === LOGIN_VIEW.SIGN_IN 
                ? "Sign in to your account to continue" 
                : "Create your account to get started"
              }
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-slate-700/50">
            {currentView === LOGIN_VIEW.SIGN_IN ? (
              <div>
                <LoginForm />
                <div className="text-center text-sm mt-6">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => handleViewChange(LOGIN_VIEW.REGISTER)}
                    className="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                    data-testid="register-button"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <SignupForm />
                <div className="text-center text-sm mt-6">
                  Already have an account?{" "}
                  <button
                    onClick={() => handleViewChange(LOGIN_VIEW.SIGN_IN)}
                    className="underline underline-offset-4 hover:text-primary transition-colors font-medium"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernLoginTemplate
