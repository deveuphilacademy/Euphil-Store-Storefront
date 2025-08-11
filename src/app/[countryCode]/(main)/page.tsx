import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import HeroSlider from "@modules/home/components/hero-slider"
import ProductShowcase from "@modules/home/components/product-showcase"
import Newsletter from "@modules/home/components/newsletter"
import NigerianCategories from "@modules/home/components/nigerian-categories"
import FeaturesSection from "@modules/home/components/features-section"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Euphil Foods - Premium Quality Products",
  description:
    "Shop premium electronics, fashion, home goods, and authentic Nigerian ingredients. Quality products delivered worldwide with exceptional service.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <FeaturesSection />
      <ProductShowcase />
      <NigerianCategories />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-3 text-center">Popular Nigerian Foods</h2>
          <p className="text-gray-600 text-center mb-8">Fresh ingredients and ready-to-eat meals</p>
          <FeaturedProducts collections={collections} region={region} />
        </div>
      </div>
      <Newsletter />
    </div>
  )
}
