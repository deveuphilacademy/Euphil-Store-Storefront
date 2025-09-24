import Link from "next/link"
import Image from "next/image"

export default function PromoBanner() {
  return (
    <section className="pb-10 lg:pb-12.5 xl:pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          {/* Large Promo Card */}
          <div className="xl:max-w-[570px] w-full">
            <div className="relative rounded-[10px] bg-gradient-to-r from-[#3C50E0] to-[#1D2144] overflow-hidden h-[300px] sm:h-[350px]">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col justify-center">
                <div className="text-white">
                  <span className="inline-block bg-white/20 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Limited Time Offer
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                    Summer Sale
                  </h2>
                  <p className="text-lg sm:text-xl mb-1">
                    Up to <span className="font-bold text-yellow-300">50% OFF</span>
                  </p>
                  <p className="text-white/80 mb-6">
                    On selected electronics and accessories
                  </p>
                  <Link
                    href="/store"
                    className="inline-flex items-center gap-2 bg-white text-[#1D2144] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>
          </div>

          {/* Small Promo Cards */}
          <div className="xl:max-w-[570px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5 h-full">
              {/* Top Small Card */}
              <div className="flex-1">
                <div className="relative rounded-[10px] bg-gradient-to-r from-[#22AD5C] to-[#1A8245] overflow-hidden h-[140px] sm:h-[160px]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 p-4 sm:p-6 h-full flex items-center">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        Free Shipping
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                        On orders over $200
                      </p>
                      <Link
                        href="/store"
                        className="inline-flex items-center text-sm font-medium text-white hover:text-green-200 transition-colors"
                      >
                        Learn More
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Icon */}
                    <div className="ml-auto">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Small Card */}
              <div className="flex-1">
                <div className="relative rounded-[10px] bg-gradient-to-r from-[#F27430] to-[#E1580E] overflow-hidden h-[140px] sm:h-[160px]">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 p-4 sm:p-6 h-full flex items-center">
                    <div className="text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        24/7 Support
                      </h3>
                      <p className="text-sm text-white/90 mb-3">
                        Always here to help
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-sm font-medium text-white hover:text-orange-200 transition-colors"
                      >
                        Contact Us
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    
                    {/* Icon */}
                    <div className="ml-auto">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
