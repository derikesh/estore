"use client"

import { Provider } from "react-redux"
import store from "@/src/store/store"
import { AddToCartModal } from "./Cart"
import type { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"

interface AddToCartModalWrapperProps {
  product: PRODUCT_INTERFACE | null
  icon?: boolean
}

export function StoreCart({ product, icon }: AddToCartModalWrapperProps) {
  return (
    <Provider store={store}>
      <AddToCartModal product={product} icon={icon} />
    </Provider>
  )
}

