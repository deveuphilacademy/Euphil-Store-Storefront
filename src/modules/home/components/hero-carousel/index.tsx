"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Premium Design",
    subtitle: "Apple Watch Ultra",
    description: "Advanced health tracking with precision GPS and water resistance up to 100m.",
    image: "/images/hero-watch.jpg",
    cta: "Shop Now",
    badge: "NEW ARRIVAL",
    bgColor: "bg-gradient-to-br from-slate-900 to-slate-700",
  },
  {
    id: 2,
    title: "SPECIAL EDITION",
    subtitle: "Apple AirPods Max",
    description: "Transparency mode and spatial audio, it delivers a premium listening experience.",
    image: "/images/hero-airpods.jpg",
    cta: "Shop Now",
    badge: "LIMITED EDITION",
    bgColor: "bg-gradient-to-br from-blue-900 to-blue-700",
  },
  {
    id: 3,
    title: "Latest Innovation",
    subtitle: "iPhone 16 Pro Max",
    description: "Featuring A18 Chip, Liquid Glass, and AI-Powered Innovation",
    image: "/images/hero-iphone.jpg",
    cta: "Shop Now",
    badge: "JUST LAUNCHED",
    bgColor: "bg-gradient-to-br from-purple-900 to-purple-700",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-transform duration-500 ease-in-out",
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            )}
          >
            <div className={cn("relative h-full flex items-center", slide.bgColor)}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-white space-y-6">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {slide.badge}
                  </span>
                  <div>
                    <p className="text-lg font-medium mb-2 opacity-90">{slide.title}</p>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-4">{slide.subtitle}</h2>
                    <p className="text-lg opacity-80 max-w-md">{slide.description}</p>
                  </div>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                    {slide.cta}
                  </Button>
                </div>
                <div className="hidden lg:block">
                  {/* Placeholder for product image */}
                  <div className="w-full h-[400px] bg-white/10 rounded-lg backdrop-blur-sm" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentSlide ? "w-8 bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}
