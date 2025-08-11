import { Truck, RefreshCw, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    icon: RefreshCw,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    icon: Shield,
    title: "100% Secure Payments",
    description: "Guarantee secure payments",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
