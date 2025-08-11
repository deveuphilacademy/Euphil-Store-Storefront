import ModernStoreTemplate from "./modern-store"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  return (
    <ModernStoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}

export default StoreTemplate
