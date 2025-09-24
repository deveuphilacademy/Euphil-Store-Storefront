import { Metadata } from "next"

import HeroSliderSection from "@modules/home/components/hero-slider-section"
import CategoriesSectionCarousel from "@modules/home/components/categories-section-carousel"
import NewArrivals from "@modules/home/components/new-arrivals"
import PromoBanner from "@modules/home/components/promo-banner"
import BestSeller from "@modules/home/components/best-seller"
import Countdown from "@modules/home/components/countdown"
import Testimonials from "@modules/home/components/testimonials"
import NewsletterModern from "@modules/home/components/newsletter-modern"

export const metadata: Metadata = {
  title: "Medusa Store — Modern Shop",
  description: "A modern storefront powered by Medusa, styled with premium template design.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  if (!countryCode) return null

  return (
    <>
      {/* Hero Slider Section */}
      <HeroSliderSection countryCode={countryCode} />
      
      {/* Spacing */}
      <div className="py-10 lg:py-15" />
      
      {/* Categories Carousel */}
      <CategoriesSectionCarousel countryCode={countryCode} />
      
      {/* New Arrivals Grid */}
      <NewArrivals countryCode={countryCode} />
      
      {/* Promotional Banners */}
      <PromoBanner />
      
      {/* Best Sellers Grid */}
      <BestSeller countryCode={countryCode} />
      
      {/* Countdown Timer */}
      <Countdown />
      
      {/* Testimonials Carousel */}
      {/* <Testimonials /> */}
      
      {/* Newsletter Signup */}
      {/* <NewsletterModern /> */}
    </>
  )
}
