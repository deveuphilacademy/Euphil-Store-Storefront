"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  MapPin,
  Heart,
  Package,
  LogOut,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ModernNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/store" },
    { name: "Categories", href: "/categories" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top bar */}
      <div className="bg-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Deliver to: Lagos, Nigeria
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/track-order" className="hover:underline">Track Order</Link>
              <Link href="/help" className="hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </div>

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
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-purple-600",
                        pathname === link.href && "text-purple-600"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">Naija</span>
              <span className="text-2xl font-bold text-gray-900">Foods</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-purple-600",
                    pathname === link.href && "text-purple-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="search"
                      placeholder="Search Nigerian foods..."
                      className="w-64"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <Button size="icon" variant="ghost">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Wishlist */}
              <Button size="icon" variant="ghost" className="relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Link href="/cart">
                <Button size="icon" variant="default" className="relative bg-purple-600 hover:bg-purple-700">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
