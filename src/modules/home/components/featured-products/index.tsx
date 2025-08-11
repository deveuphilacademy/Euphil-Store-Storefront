import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  // Get first collection for featured products
  const featuredCollection = collections[0]
  
  if (!featuredCollection) return null
  
  return <ProductRail collection={featuredCollection} region={region} />
}
