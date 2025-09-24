"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";

interface ModernNavProps {
  regions: StoreRegion[];
}

// Navigation items with icons
const navigationItems = [
  { 
    name: "Home", 
    href: "/", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    name: "Store", 
    href: "/store", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  { 
    name: "Search", 
    href: "/search", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    show: process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED
  },
  { 
    name: "Account", 
    href: "/account", 
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
];

const ModernNavbar = ({ regions }: ModernNavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className={`relative mt-4 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/5 border border-white/20"
              : "bg-white/60 backdrop-blur-lg border border-white/30"
          }`}
          layout
        >
          <nav className="flex items-center justify-between h-16 px-6">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
              >
                <motion.div
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <LocalizedClientLink href="/" className="flex items-center space-x-3 group">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl font-bold text-white">M</span>
                </motion.div>
                <motion.span 
                  className="hidden sm:block text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Medusa Store
                </motion.span>
              </LocalizedClientLink>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                if (item.show === false) return null;
                
                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <LocalizedClientLink
                      href={item.href}
                      className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Hover background */}
                      <AnimatePresence>
                        {hoveredItem === item.name && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl -z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </LocalizedClientLink>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
                          initial={{ opacity: 0, scale: 0, x: "-50%" }}
                          animate={{ opacity: 1, scale: 1, x: "-50%" }}
                          exit={{ opacity: 0, scale: 0, x: "-50%" }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Cart Button */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Suspense
                  fallback={
                    <motion.div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
                      </svg>
                      <span>Cart (0)</span>
                    </motion.div>
                  }
                >
                  <div className="[&>*]:bg-gradient-to-r [&>*]:from-emerald-500 [&>*]:to-blue-500 [&>*]:text-white [&>*]:rounded-xl [&>*]:font-medium [&>*]:shadow-lg [&>*]:transition-all [&>*]:duration-300 [&>*:hover]:shadow-xl [&>*:hover]:shadow-emerald-500/25">
                    <CartButton />
                  </div>
                </Suspense>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="lg:hidden border-t border-gray-200/50 bg-white/50 backdrop-blur-xl rounded-b-2xl"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 py-4 space-y-2">
                  {navigationItems.map((item, index) => {
                    if (item.show === false) return null;
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <LocalizedClientLink
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-200 group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="font-medium">{item.name}</span>
                        </LocalizedClientLink>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </motion.div>
  );
};

export default async function ModernNav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return <ModernNavbar regions={regions} />;
}
