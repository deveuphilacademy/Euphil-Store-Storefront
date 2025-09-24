import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function ModernFooter() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='7' cy='7' r='1'/%3e%3ccircle cx='27' cy='7' r='1'/%3e%3ccircle cx='47' cy='7' r='1'/%3e%3ccircle cx='7' cy='27' r='1'/%3e%3ccircle cx='27' cy='27' r='1'/%3e%3ccircle cx='47' cy='27' r='1'/%3e%3ccircle cx='7' cy='47' r='1'/%3e%3ccircle cx='27' cy='47' r='1'/%3e%3ccircle cx='47' cy='47' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <LocalizedClientLink href="/" className="inline-block mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-white">EU</span>
                  </div>
                  <span className="text-2xl font-bold">EuphilFoods Store</span>
                </div>
              </LocalizedClientLink>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your premium destination for quality products. We&apos;re committed to delivering excellence in every purchase.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-.1.1h2.2v-3.32h-3c-3.44 0-4.16 2.53-4.16 4.1v1.15h-2v3.32h2v8.69h3.32v-8.69h2.8l.37-3.32z', href: '#' },
                  { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', href: '#' },
                  { name: 'Instagram', icon: 'M16 11.37A4.63 4.63 0 1111.37 16 4.63 4.63 0 0116 11.37zm1.94-4.94a1.31 1.31 0 011.31-1.31h.01a1.31 1.31 0 011.31 1.31v.01a1.31 1.31 0 01-1.31 1.31h-.01a1.31 1.31 0 01-1.31-1.31v-.01zM12 2.16c3.2-.08 6.32-.08 9.52 0 1.54.05 2.78 1.32 2.84 2.84.08 3.2.08 6.32 0 9.52-.05 1.54-1.32 2.78-2.84 2.84-3.2.08-6.32.08-9.52 0-1.54-.05-2.78-1.32-2.84-2.84-.08-3.2-.08-6.32 0-9.52.05-1.54 1.32-2.78 2.84-2.84z', href: '#' },
                  { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Shop All', href: '/store' },
                  { name: 'New Arrivals', href: '/store?sort=created_at' },
                  { name: 'Best Sellers', href: '/store?sort=popularity' },
                  { name: 'Sale Items', href: '/store?sale=true' },
                  { name: 'Gift Cards', href: '/gift-cards' },
                ].map((link) => (
                  <li key={link.name}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                      {link.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            {product_categories && product_categories.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Categories</h3>
                <ul className="space-y-4">
                  {product_categories.slice(0, 5).map((category) => {
                    if (category.parent_category) return null;
                    return (
                      <li key={category.id}>
                        <LocalizedClientLink
                          href={`/categories/${category.handle}`}
                          className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                        >
                          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                          {category.name}
                        </LocalizedClientLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Help Center', href: '/help' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'Shipping Info', href: '/shipping' },
                  { name: 'Returns', href: '/returns' },
                  { name: 'Size Guide', href: '/size-guide' },
                ].map((link) => (
                  <li key={link.name}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                      {link.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
              <p className="text-gray-400 mb-6">
                Subscribe to our newsletter for the latest updates, exclusive deals, and product launches.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Medusa Store. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <LocalizedClientLink href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </LocalizedClientLink>
                <LocalizedClientLink href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </LocalizedClientLink>
                <LocalizedClientLink href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </LocalizedClientLink>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm mr-2">We accept:</span>
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div key={method} className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                    <span className="text-xs font-mono text-gray-300">{method.slice(0, 2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
