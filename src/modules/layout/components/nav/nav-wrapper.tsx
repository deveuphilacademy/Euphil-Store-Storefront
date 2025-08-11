import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import RedesignedNav from "./redesigned-nav"

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (!cart) {
    return null
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!)
    cart.items = enrichedItems
  }

  return cart
}

export default async function NavWrapper() {
  const cart = await fetchCart()

  return <RedesignedNav cart={cart} />
}
