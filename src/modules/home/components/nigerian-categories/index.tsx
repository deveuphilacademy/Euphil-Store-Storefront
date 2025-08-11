import Link from "next/link"
import { Card } from "@/components/ui/card"
import { 
  Soup,
  Wheat,
  Fish,
  Apple,
  Coffee,
  Beef,
  Cookie,
  Salad
} from "lucide-react"

const nigerianCategories = [
  {
    name: "Soups & Stews",
    icon: Soup,
    href: "/categories/soups-stews",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Egusi, Ogbono, Efo Riro"
  },
  {
    name: "Swallows",
    icon: Wheat,
    href: "/categories/swallows",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Fufu, Pounded Yam, Eba"
  },
  {
    name: "Proteins",
    icon: Fish,
    href: "/categories/proteins",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Fish, Meat, Poultry"
  },
  {
    name: "Fresh Produce",
    icon: Apple,
    href: "/categories/fresh-produce",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Vegetables & Fruits"
  },
  {
    name: "Breakfast",
    icon: Coffee,
    href: "/categories/breakfast",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Akara, Moi Moi, Pap"
  },
  {
    name: "Grills & BBQ",
    icon: Beef,
    href: "/categories/grills-bbq",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Suya, Asun, Nkwobi"
  },
  {
    name: "Snacks",
    icon: Cookie,
    href: "/categories/snacks",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Chin Chin, Puff Puff"
  },
  {
    name: "Healthy Options",
    icon: Salad,
    href: "/categories/healthy",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    description: "Salads & Diet Foods"
  },
]

export default function NigerianCategories() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-gray-900">Shop by Category</h2>
          <p className="text-gray-600">Authentic Nigerian ingredients delivered to your doorstep</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {nigerianCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border-0 bg-white group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full transition-all duration-300 ${category.color} group-hover:scale-110`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
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
