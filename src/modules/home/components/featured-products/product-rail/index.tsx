import { HttpTypes } from "@medusajs/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@modules/products/components/product-card"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} region={region} />
          ))}
      </div>
      {products.length > 8 && (
        <div className="flex justify-center mt-8">
          <Link href={`/collections/${collection.handle}`}>
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
