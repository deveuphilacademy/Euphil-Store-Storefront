import { HttpTypes } from "@medusajs/types"

export function formatAmount({
  amount,
  region,
}: {
  amount: number
  region: HttpTypes.StoreRegion
}) {
  return new Intl.NumberFormat(region.locale || "en-US", {
    style: "currency",
    currency: region.currency_code,
    minimumFractionDigits: 2,
  }).format(amount / 100)
}
