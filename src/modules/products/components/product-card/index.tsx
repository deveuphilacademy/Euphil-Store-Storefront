import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { formatAmount } from "@lib/util/prices"
import Thumbnail from "@modules/products/components/thumbnail"

type ProductCardProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function ProductCard({ product, region }: ProductCardProps) {
  const price = product.variants?.[0]?.prices?.find(
    (p) => p.currency_code === region.currency_code
  )

  const originalPrice = product.variants?.[0]?.prices?.find(
    (p) => p.currency_code === region.currency_code && p.price_list_id
  )

  const hasDiscount = originalPrice && price && originalPrice.amount > price.amount

  return (
    <Card className="group h-full overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product.handle}`}>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            SALE
          </Badge>
        )}
        
        {/* Add dietary badges */}
        {product.metadata?.isHalal && (
          <Badge className="absolute top-2 right-12 bg-green-500 text-white">
            Halal
          </Badge>
        )}
        
        {product.metadata?.isOrganic && (
          <Badge className="absolute top-12 left-2 bg-green-600 text-white">
            Organic
          </Badge>
        )}
        
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center gap-2">
          {price && (
            <span className="text-lg font-bold text-gray-900">
              {formatAmount({
                amount: price.amount,
                region: region,
              })}
            </span>
          )}
          
          {hasDiscount && originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatAmount({
                amount: originalPrice.amount,
                region: region,
              })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
