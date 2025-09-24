import { getProductsListWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import Link from "next/link"
import Image from "next/image"
import { convertToLocale } from "@lib/util/money"

interface NewArrivalsProps {
  countryCode: string
}

export default async function NewArrivals({ countryCode }: NewArrivalsProps) {
  try {
    const region = await getRegion(countryCode)
    if (!region) return null

    const { response } = await getProductsListWithSort({
      page: 1,
      sortBy: "created_at",
      countryCode,
      queryParams: { limit: 8 },
    })

    const products = response.products

    if (!products?.length) return null

    return (
      <section className="pb-10 lg:pb-12.5 xl:pb-15">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-semibold text-[#1D2144] text-2xl sm:text-3xl mb-2">
                New Arrivals
              </h2>
              <p className="text-[#64748B]">Check out our latest products</p>
            </div>
            <Link 
              href="/store"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#3C50E0] hover:text-[#1D2144] transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const price = product.calculated_price
              const thumbnail = product.thumbnail

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group block"
                >
                  <div className="bg-white rounded-[10px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Quick view button - appears on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-white text-[#1D2144] px-4 py-2 rounded-full text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Quick View
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#1D2144] text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-[#3C50E0] transition-colors">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-[#64748B] mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        {price ? (
                          <>
                            <span className="font-semibold text-[#1D2144] text-lg">
                              {convertToLocale({
                                amount: price.calculated_amount,
                                currency_code: region.currency_code,
                              })}
                            </span>
                            {price.original_amount > price.calculated_amount && (
                              <span className="text-sm text-[#64748B] line-through">
                                {convertToLocale({
                                  amount: price.original_amount,
                                  currency_code: region.currency_code,
                                })}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-[#64748B]">Price unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mobile View All Button */}
          <div className="flex justify-center mt-8 sm:hidden">
            <Link 
              href="/store"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3C50E0] hover:text-[#1D2144] transition-colors bg-white px-6 py-3 rounded-full border border-[#3C50E0] hover:border-[#1D2144]"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Failed to load new arrivals:', error)
    return null
  }
}
