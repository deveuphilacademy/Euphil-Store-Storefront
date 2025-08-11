"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  Package,
  LogOut,
  Settings,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartDropdown from "../cart-dropdown"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RedesignedNavProps {
  cart?: HttpTypes.StoreCart | null
}

const shopCategories = [
  {
    title: "Electronics",
    href: "/categories/electronics",
    description: "Smartphones, laptops, and gadgets",
  },
  {
    title: "Fashion",
    href: "/categories/fashion",
    description: "Clothing, shoes, and accessories",
  },
  {
    title: "Home & Living",
    href: "/categories/home-living",
    description: "Furniture, decor, and appliances",
  },
  {
    title: "Nigerian Foods",
    href: "/categories/nigerian-foods",
    description: "Authentic ingredients and meals",
  },
]

export default function RedesignedNav({ cart }: RedesignedNavProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient()

  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Main navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-purple-600">
                    Home
                  </Link>
                  <Link href="/store" className="text-lg font-medium hover:text-purple-600">
                    Shop
                  </Link>
                  <Link href="/categories" className="text-lg font-medium hover:text-purple-600">
                    Categories
                  </Link>
                  <Link href="/about" className="text-lg font-medium hover:text-purple-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-purple-600">
                    Contact
                  </Link>
                  {!isAuthenticated && (
                    <div className="flex flex-col gap-2 mt-4">
                      <LoginLink>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </LoginLink>
                      <RegisterLink>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Register
                        </Button>
                      </RegisterLink>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">Euphil</span>
              <span className="text-2xl font-bold text-gray-900">Foods</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {shopCategories.map((category) => (
                          <li key={category.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={category.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {category.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {category.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-2">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/store"
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-50 to-purple-100 p-6 no-underline outline-none focus:shadow-md"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-purple-900">
                                View All Products
                              </div>
                              <p className="text-sm leading-tight text-purple-700">
                                Browse our complete collection
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search - More prominent */}
              <div className="hidden md:flex items-center">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 h-10 border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
              </div>

              {/* Mobile Search Button */}
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button size="icon" variant="ghost" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>

              {/* User menu / Auth */}
              {!isLoading && (
                <>
                  {isAuthenticated && user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={user.picture || ""} 
                              alt={user.given_name || user.email || "User"} 
                            />
                            <AvatarFallback className="bg-purple-600 text-white">
                              {(user.given_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hidden lg:inline-block text-sm font-medium">
                            {user.given_name || user.email?.split('@')[0]}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <Link href="/account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          <Link href="/account/orders">Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Heart className="mr-2 h-4 w-4" />
                          <Link href="/account/wishlist">Wishlist</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <Link href="/account/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <LogoutLink className="flex items-center w-full cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </LogoutLink>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="hidden lg:flex items-center gap-2">
                      <LoginLink>
                        <Button variant="ghost" size="sm">
                          Sign In
                        </Button>
                      </LoginLink>
                      <RegisterLink>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Register
                        </Button>
                      </RegisterLink>
                    </div>
                  )}
                </>
              )}

              {/* Cart - Using existing Medusa cart */}
              <div className="relative">
                <LocalizedClientLink
                  href="/cart"
                  className="flex items-center"
                >
                  <Button size="icon" className="relative bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </LocalizedClientLink>
                {/* Cart dropdown will be handled by the existing CartDropdown component */}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden border-t px-4 py-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 h-10 border-gray-300 focus:border-purple-600 focus:ring-purple-600"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </nav>
    </header>
  )
}
