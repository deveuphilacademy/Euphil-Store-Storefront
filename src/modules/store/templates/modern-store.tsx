import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal, Grid2X2, Grid3X3 } from "lucide-react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Our Nigerian Food Store
            </h1>
            <p className="text-gray-600">
              Browse through our collection of authentic Nigerian ingredients and ready-to-eat meals
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-14 bg-transparent">
              <TabsTrigger value="all" className="text-base">All Products</TabsTrigger>
              <TabsTrigger value="fresh" className="text-base">Fresh Foods</TabsTrigger>
              <TabsTrigger value="packaged" className="text-base">Packaged</TabsTrigger>
              <TabsTrigger value="ready" className="text-base">Ready to Eat</TabsTrigger>
              <TabsTrigger value="frozen" className="text-base">Frozen</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </h3>
                <Button variant="ghost" size="sm">Clear all</Button>
              </div>
              <RefinementList sortBy={sort} />
            </Card>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">24</span> products
              </p>
              
              <div className="flex items-center gap-4">
                {/* Sort Select */}
                <Select defaultValue={sort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at">Newest First</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                    <SelectItem value="name_desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>

                {/* Grid View Options */}
                <div className="hidden sm:flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
