"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  onSubmit?: () => void
  showSaveButton?: boolean
  className?: string
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  description,
  children,
  isLoading = false,
  isSuccess = false,
  isError = false,
  errorMessage,
  onSubmit,
  showSaveButton = true,
  className,
}) => {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {showSuccess && (
            <div className="flex items-center text-green-600">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-sm">Saved</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
          {isError && errorMessage && (
            <div className="flex items-center text-red-600 text-sm">
              <X className="h-4 w-4 mr-1" />
              {errorMessage}
            </div>
          )}
          {showSaveButton && onSubmit && (
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
