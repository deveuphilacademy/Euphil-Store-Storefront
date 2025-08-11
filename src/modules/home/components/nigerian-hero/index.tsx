"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const slides = [
  {
    id: 1,
    label: "Premium Quality",
    title: "Taste of Nigeria",
    subtitle: "Delivered Fresh Daily",
    description: "Experience authentic Nigerian cuisine with our premium selection of fresh ingredients and prepared meals.",
    cta: "Shop Now",
    ctaLink: "/store",
    image: "/images/hero-1.jpg",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    id: 2,
    label: "International Shipping",
    title: "Worldwide Delivery",
    subtitle: "To Your Doorstep",
    description: "Serving the Nigerian diaspora across USA, UK, Canada, and 50+ countries worldwide.",
    cta: "Learn More",
    ctaLink: "/shipping",
    image: "/images/hero-2.jpg",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    id: 3,
    label: "AI Powered",
    title: "Smart Meal Planning",
    subtitle: "Personalized for You",
    description: "Get AI-powered Nigerian meal recommendations based on your dietary preferences and health goals.",
    cta: "Try Now",
    ctaLink: "/ai-assistant",
    image: "/images/hero-3.jpg",
    bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
  },
]

export default function NigerianHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[650px] md:h-[600px] overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-transform duration-700 ease-in-out",
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            )}
          >
            <div className={cn("relative h-full flex items-center", slide.bgImage)}>
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }} />
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className={cn("space-y-6", slide.accent)}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-2xl md:text-3xl font-light opacity-90">
                      {slide.subtitle}
                    </p>
                    <p className="text-lg md:text-xl max-w-xl opacity-80">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link href={slide.ctaLink}>
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8">
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {slide.cta}
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        <MapPin className="mr-2 h-5 w-5" />
                        Check Delivery Areas
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentSlide ? "w-10 bg-white" : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
