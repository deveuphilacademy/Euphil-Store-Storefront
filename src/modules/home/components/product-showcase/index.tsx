"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  badge?: string
}

// Sample product data - replace with actual data from your backend
const products: Product[] = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    price: 899,
    originalPrice: 930,
    image: "/images/products/iphone.jpg",
    category: "popular",
    badge: "Hot"
  },
  {
    id: "2",
    name: "Apple AirPods Max",
    price: 450,
    originalPrice: 500,
    image: "/images/products/airpods.jpg",
    category: "popular"
  },
  {
    id: "3",
    name: "MacBook Air M4",
    price: 600,
    originalPrice: 699,
    image: "/images/products/macbook.jpg",
    category: "bestseller",
    badge: "Sale"
  },
  {
    id: "4",
    name: "Apple Watch Ultra",
    price: 89,
    originalPrice: 99,
    image: "/images/products/watch.jpg",
    category: "new"
  },
  {
    id: "5",
    name: "Smart Home Camera",
    price: 450,
    originalPrice: 500,
    image: "/images/products/camera.jpg",
    category: "promotion",
    badge: "20% Off"
  },
  {
    id: "6",
    name: "Galaxy S24 Ultra",
    price: 600,
    originalPrice: 700,
    image: "/images/products/galaxy.jpg",
    category: "bestseller"
  }
]

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("popular")

  const getFilteredProducts = (category: string) => {
    if (category === "all") return products
    return products.filter(product => product.category === category)
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Product Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full">
            {product.badge}
          </span>
        )}

        {/* Product Image */}
        <div className="relative h-64 bg-gray-50 overflow-hidden">
          {/* Image Placeholder - Replace with actual product images */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl text-purple-200 mb-2">📱</div>
            <p className="text-xs text-purple-400 font-medium">Product Image</p>
            <p className="text-[10px] text-purple-300">280x280px</p>
          </div>
          {/* Example for actual image:
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          */}
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="icon"
              className="bg-white hover:bg-purple-600 hover:text-white rounded-full"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-white hover:bg-purple-600 hover:text-white rounded-full"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="bg-white hover:bg-purple-600 hover:text-white rounded-full"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-purple-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="bestseller">Best Sellers</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
            <TabsTrigger value="promotion">Promotions</TabsTrigger>
            <TabsTrigger value="all">All Products</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getFilteredProducts(activeTab).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Link href="/store">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
