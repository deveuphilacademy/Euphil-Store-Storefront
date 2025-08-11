"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    setEmail("")
    setIsSubmitting(false)
    
    // You can add toast notification here
    console.log("Newsletter subscription:", email)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don't Miss Out Latest Trends & Offers
            </h2>
            
            <p className="text-lg text-white/90 mb-8">
              Register to receive news about the latest offers & discount codes
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-6 bg-white text-gray-900 border-0 rounded-full placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-8 bg-purple-800 hover:bg-purple-900 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="mt-4 text-sm text-white/70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
