import ModernCartTemplate from "./modern-cart"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <ModernCartTemplate cart={cart} customer={customer} />
  )
}

export default CartTemplate
