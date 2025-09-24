import { getProductsListWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import HeroSlider from "./hero-slider"

export default async function HeroSliderSection({
  countryCode,
}: {
  countryCode: string
}) {
  try {
    const region = await getRegion(countryCode)
    if (!region) return null

    const { response } = await getProductsListWithSort({
      page: 1,
      sortBy: "created_at",
      countryCode,
      queryParams: { limit: 6 }, // Get 6 products for variety
    })

    const products = response.products || []

    // Transform products to match the HeroSlider interface
    const transformedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      thumbnail: product.thumbnail,
      calculated_price: product.calculated_price,
    }))

    return (
      <HeroSlider 
        products={transformedProducts} 
        region={{ currency_code: region.currency_code }} 
      />
    )
  } catch (error) {
    console.error('Failed to load hero slider data:', error)
    
    // Return a fallback hero if data fails
    return (
      <section className="relative h-screen max-h-[800px] min-h-[600px] flex items-center justify-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center text-white space-y-6">
          <h1 className="text-5xl lg:text-7xl font-bold">Welcome to Our Store</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover amazing products and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/store"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:scale-105 transition-all duration-300"
            >
              Explore Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    )
  }
}
