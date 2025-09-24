import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCollectionsWithProducts } from "@/lib/data/collections"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default async function CategoriesSection({
  countryCode,
}: {
  countryCode: string
}) {
  try {
    const collections = await getCollectionsWithProducts(countryCode)

    if (!collections?.length) {
      return null
    }

    // Take first 6 collections or all if less
    const displayCollections = collections.slice(0, 6)

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCollections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.handle}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">
                      {/* Simple icon mapping - you can enhance this */}
                      {collection.title.toLowerCase().includes('electronics') ? '📱' :
                       collection.title.toLowerCase().includes('clothing') ? '👕' :
                       collection.title.toLowerCase().includes('books') ? '📚' :
                       collection.title.toLowerCase().includes('home') ? '🏠' :
                       collection.title.toLowerCase().includes('sports') ? '⚽' :
                       '📦'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {collection.products?.length || 0} products
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Button variant="outline" className="flex items-center gap-2">
            View All Categories
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
  } catch (error) {
    console.error('Failed to load collections:', error)
    // Return null to hide the section if collections can't be loaded
    return null
  }
}
