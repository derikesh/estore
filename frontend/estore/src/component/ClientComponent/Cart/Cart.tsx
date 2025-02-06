"use client"

import { useState } from "react"
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LuShoppingCart } from "react-icons/lu"
import type { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"

// redux action
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart, updateCart, clearCart } from "@/src/store/slices"
import type { RootState } from "@/src/store/store"

export function AddToCartModal({ product, icon }: { product: PRODUCT_INTERFACE | null; icon?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ id: product._id, name: product.name, quantity: 1, price: product.price ,image:product.images.imageUrl}))
      setIsOpen(true)
    }
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateCart({ id, quantity, name: "", price: 0 ,image:'' }))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart({ id, name: "", quantity: 0, price: 0,image:'' }))
  }

  const handleClearCart = () => {
    dispatch(clearCart({ id: "", name: "", quantity: 0, price: 0,image:'' }))
  }

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="w-full" asChild>
        <Button onClick={handleAddToCart}>
          {icon ? (
            <LuShoppingCart />
          ) : (
            <div className="bg-black hover:bg-gray-800 px-4 py-2 text-white rounded-[5px] w-full">Add to cart</div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[540px] sm:max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>{cartItems.length > 0 ? "Review your cart items" : "Your cart is empty"}</SheetDescription>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <div className="mt-6 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <FaMinus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            
            <Button variant="default" className="w-[90%] absolute bottom-5" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-500">Your cart is empty</div>
        )}
      </SheetContent>
    </Sheet>
  )
}

