import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-black shadow-sm border-b border-gray-800">
      <div className="content-container">
        <nav className="flex items-center justify-between h-16">
          {/* Left Section - Mobile Menu + Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu */}
            <div className="flex items-center lg:hidden">
              <SideMenu regions={regions} />
            </div>

            {/* Logo */}
            <LocalizedClientLink
              href="/"
              className="flex items-center space-x-3 group"
              data-testid="nav-store-link"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 group-hover:shadow-xl">
                <span className="text-lg font-black text-white">M</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                Medusa Store
              </span>
            </LocalizedClientLink>
          </div>

          {/* Center Section - Categories Dropdown */}
          <div className="hidden lg:flex items-center space-x-1">
            <button className="flex items-center space-x-1 px-4 py-2 text-white hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              <span className="text-sm font-medium">All Categories</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Center Section - Search Bar */}
          {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="I am shopping for..."
                  className="w-full px-4 py-2 pl-4 pr-12 text-sm bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Account */}
            <LocalizedClientLink
              href="/account"
              className="hidden sm:flex items-center space-x-1 text-white hover:text-blue-400 transition-colors duration-200"
              data-testid="nav-account-link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400">ACCOUNT</span>
                <span className="text-sm font-medium">Sign In / Register</span>
              </div>
            </LocalizedClientLink>

            {/* Wishlist */}
            <button className="hidden sm:flex relative p-2 text-white hover:text-blue-400 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="relative flex items-center p-2 text-white hover:text-blue-400 transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                </LocalizedClientLink>
              }
            >
              <div className="[&>*]:relative [&>*]:flex [&>*]:items-center [&>*]:p-2 [&>*]:text-white [&>*:hover]:text-blue-400 [&>*]:transition-colors [&>*]:duration-200">
                <CartButton />
              </div>
            </Suspense>
          </div>
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className="hidden lg:block border-t border-gray-800">
        <div className="content-container">
          <nav className="flex items-center justify-between h-12">
            {/* Left Navigation */}
            <div className="flex items-center space-x-8">
              <LocalizedClientLink
                href="/"
                className="text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Popular
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/contact"
                className="text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Contact
              </LocalizedClientLink>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                  <span>Pages</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium">
                  <span>Blogs</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <LocalizedClientLink
                href="/best-selling"
                className="flex items-center space-x-1 text-sm text-white hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                <span>Best Selling</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">SALE</span>
              </LocalizedClientLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
