"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SliderItem {
  id: number
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  badge?: string
}

const sliderData: SliderItem[] = [
  {
    id: 1,
    title: "iPhone 16 Pro Max",
    subtitle: "LIMITED EDITION",
    description: "Featuring A18 Chip, Liquid Glass, and AI-Powered Innovation",
    buttonText: "Shop Now",
    buttonLink: "/store",
    image: "/images/iphone-hero.jpg",
    badge: "LIMITED EDITION"
  },
  {
    id: 2,
    title: "Premium Nigerian Foods",
    subtitle: "AUTHENTIC TASTE",
    description: "Fresh ingredients and traditional spices delivered to your doorstep",
    buttonText: "Shop Now",
    buttonLink: "/store",
    image: "/images/food-hero.jpg",
    badge: "SPECIAL OFFER"
  },
  {
    id: 3,
    title: "Apple Watch Ultra",
    subtitle: "ADVANCED TECHNOLOGY",
    description: "The aerospace-grade titanium case strikes the perfect balance",
    buttonText: "Shop Now",
    buttonLink: "/store",
    image: "/images/watch-hero.jpg",
    badge: "NEW ARRIVAL"
  }
]

const sideProducts = [
  {
    id: 1,
    title: "Smart Security Home Camera",
    price: "$450",
    image: "/images/camera.jpg",
    link: "/product/smart-camera"
  },
  {
    id: 2,
    title: "Galaxy S24 Ultra 5G",
    price: "$600",
    image: "/images/galaxy.jpg",
    link: "/product/galaxy-s24"
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
  }

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Slider - Takes up 8 columns on large screens */}
          <div className="lg:col-span-8">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              {sliderData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="relative h-full bg-gradient-to-r from-purple-50 to-purple-100">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full px-8 lg:px-16">
                        <div className="max-w-lg">
                          {slide.badge && (
                            <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
                              {slide.badge}
                            </span>
                          )}
                          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            {slide.title}
                          </h1>
                          <p className="text-gray-600 mb-6">
                            {slide.description}
                          </p>
                          <Link href={slide.buttonLink}>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                              {slide.buttonText}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* Product Image Area - Replace src with your actual images */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Replace this div with an Image component */}
                        <div className="absolute inset-0 flex items-center justify-center bg-purple-50/50 rounded-l-3xl">
                          <div className="text-center">
                            <div className="text-6xl text-purple-300 mb-4">📱</div>
                            <p className="text-sm text-purple-600 font-medium">Product Image</p>
                            <p className="text-xs text-purple-500">Replace with actual image</p>
                          </div>
                        </div>
                        {/* Example for actual image implementation:
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain"
                          priority={index === 0}
                        />
                        */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {sliderData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-purple-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Product Cards - Takes up 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-4">
            {sideProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <Link href={product.link}>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-purple-50 to-white p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Save up to <span className="text-purple-600 font-semibold">{product.price}</span>
                          </p>
                        </div>
                        <div className="w-20 h-20 bg-purple-100 rounded-lg overflow-hidden relative">
                          {/* Product Image Placeholder - Replace with actual images */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-2xl mb-1">{product.id === 1 ? "📷" : "📱"}</div>
                            <span className="text-[8px] text-purple-600">Image</span>
                          </div>
                          {/* Example for actual image:
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                          */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
