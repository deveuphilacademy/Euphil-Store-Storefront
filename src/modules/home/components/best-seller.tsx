import { getProductsListWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import Link from "next/link"
import Image from "next/image"
import { convertToLocale } from "@lib/util/money"

interface BestSellerProps {
  countryCode: string
}

export default async function BestSeller({ countryCode }: BestSellerProps) {
  try {
    const region = await getRegion(countryCode)
    if (!region) return null

    const { response } = await getProductsListWithSort({
      page: 1,
      sortBy: "created_at", // You can change this to a different sort criteria for best sellers
      countryCode,
      queryParams: { limit: 6 },
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
                Best Sellers
              </h2>
              <p className="text-[#64748B]">Most popular products this week</p>
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

          {/* Products Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Best Seller Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#F56565] text-white text-xs font-medium px-2 py-1 rounded-full">
                          🔥 Best Seller
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col gap-2">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1D2144] hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1D2144] hover:bg-gray-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button - appears on hover */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full bg-[#1D2144] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#3C50E0] transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-[#1D2144] text-lg mb-2 line-clamp-2 group-hover:text-[#3C50E0] transition-colors">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Rating - placeholder for now */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-[#64748B] ml-1">(4.0)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {price ? (
                            <>
                              <span className="font-bold text-[#1D2144] text-xl">
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

                        {/* Stock status */}
                        <span className="text-xs text-green-600 font-medium">In Stock</span>
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
              View All Best Sellers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Failed to load best sellers:', error)
    return null
  }
}
