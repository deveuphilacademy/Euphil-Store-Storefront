import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  Smartphone, 
  Headphones, 
  Watch, 
  Laptop,
  Camera,
  Gamepad2,
  Tv,
  Speaker
} from "lucide-react"

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    href: "/categories/smartphones",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Audio",
    icon: Headphones,
    href: "/categories/audio",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Wearables",
    icon: Watch,
    href: "/categories/wearables",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Computers",
    icon: Laptop,
    href: "/categories/computers",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Photography",
    icon: Camera,
    href: "/categories/photography",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/categories/gaming",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "TV & Home",
    icon: Tv,
    href: "/categories/tv-home",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Speakers",
    icon: Speaker,
    href: "/categories/speakers",
    color: "bg-teal-100 text-teal-600",
  },
]

export default function CategoriesGrid() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`p-3 rounded-full ${category.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-center">{category.name}</span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
