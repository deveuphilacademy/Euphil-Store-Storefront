import { getCollectionsWithProducts } from "@/lib/data/collections"
import CategoriesCarousel from "./categories-carousel"

export default async function CategoriesSectionCarousel({
  countryCode,
}: {
  countryCode: string
}) {
  try {
    const collections = await getCollectionsWithProducts(countryCode)

    if (!collections?.length) {
      return null
    }

    // Transform collections to match the carousel interface
    const categoryData = collections.map((collection) => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      products: collection.products,
      thumbnail: collection.thumbnail || undefined,
    }))

    return <CategoriesCarousel categories={categoryData} />
  } catch (error) {
    console.error('Failed to load collections for carousel:', error)
    // Return null to hide the section if collections can't be loaded
    return null
  }
}
