import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react"

export default function ModernFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: {
      title: "Shop",
      links: [
        { name: "All Products", href: "/store" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Best Sellers", href: "/best-sellers" },
        { name: "Special Offers", href: "/offers" },
      ],
    },
    categories: {
      title: "Categories",
      links: [
        { name: "Soups & Stews", href: "/categories/soups-stews" },
        { name: "Proteins", href: "/categories/proteins" },
        { name: "Swallows", href: "/categories/swallows" },
        { name: "Snacks", href: "/categories/snacks" },
      ],
    },
    help: {
      title: "Help & Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
      ],
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Partners", href: "/partners" },
      ],
    },
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-purple-400">Euphil</span>
              <span className="text-2xl font-bold text-white">Foods</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Premium quality products and authentic Nigerian flavors delivered worldwide.
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                +234 123 456 7890
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                hello@euphilfoods.com
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} Euphil Foods. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
