import { Card, CardContent } from "@/components/ui/card"
import { getProductsListWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import ProductPreview from "@/modules/products/components/product-preview"

export default async function ProductGrid({
  countryCode,
  title = "New Arrivals",
  limit = 12,
}: {
  countryCode: string
  title?: string
  limit?: number
}) {
  try {
    const region = await getRegion(countryCode)
    if (!region) return null

    const { response } = await getProductsListWithSort({
      page: 1,
      sortBy: "created_at",
      countryCode,
      queryParams: { limit },
    })

    const products = response.products

    return (
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
            {/* Placeholder for a sort/filter action if needed later */}
          </div>

          {products.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                No products found.
              </CardContent>
            </Card>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((p) => (
                <li key={p.id}>
                  {/* ProductPreview handles price and thumbnail using region */}
                  {/* It links to /products/[handle] with localized routing */}
                  {/* It also ensures calculated_price is loaded */}
                  {/* Using ShadCN layout grid around it for spacing */}
                  <ProductPreview product={p} region={region} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    )
  } catch (error) {
    console.error('Failed to load products:', error)
    
    // Return a fallback UI when backend is unavailable
    return (
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <div className="text-muted-foreground mb-4">
                <p className="text-sm mb-2">Unable to load products at the moment.</p>
                <p className="text-xs">Please check your connection or try again later.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }
}

