"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ModernHero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start mb-8">
                <Badge className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-100 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  Premium Nigerian Foods
                </Badge>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Fresh Nigerian</span>
                <span className="block text-primary">Groceries Delivered</span>
              </h1>

              {/* Description */}
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                From your favorite jollof ingredients to traditional spices and ready-made meals. 
                Experience authentic Nigerian cuisine delivered fresh to your doorstep worldwide.
              </p>

              {/* CTA Buttons */}
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-2xl">
                  <Link href="/store">
                    <Button 
                      size="lg" 
                      className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-2xl text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 rounded-2xl">
                  <Link href="/about">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-2xl text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 border-2"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-10 flex gap-8 justify-center lg:justify-start">
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1000+</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Support</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Decorative blob shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform">
        <div className="w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>
      <div className="absolute top-1/2 left-0 -translate-x-1/4 transform">
        <div className="w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      <div className="absolute bottom-0 right-1/4 translate-y-1/4 transform">
        <div className="w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}
