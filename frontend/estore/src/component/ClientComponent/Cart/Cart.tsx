'use client'

import { useState } from 'react'
import { FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LuShoppingCart } from 'react-icons/lu'

interface Product {
  id?: number
  name?: string
  price?: number
  image?: string
}

export function AddToCartModal({ product, icon }: { product: Product | null, icon?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity(q => q + 1)
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1))

  const handleAddToCart = () => {
    if (product) {
      // Here you would typically dispatch an action to add the item to the cart
      console.log(`Added ${quantity} of ${product.name} to cart`)
      setIsOpen(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className=' w-full' asChild>
        <Button onClick={() => setIsOpen(true)}>{icon ? <LuShoppingCart /> : <div className='bg-black hover:bg-gray-800 px-4 py-2 text-white rounded-[5px] w-full' >Add to card</div>}</Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:w-[540px] sm:max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Add to Cart</SheetTitle>
          <SheetDescription>
            {product ? "Add this item to your shopping cart" : "No product selected"}
          </SheetDescription>
        </SheetHeader>
        {product ? (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price?.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <FaMinus className="h-4 w-4" />
              </Button>
              <Input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <FaPlus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${ product.price ? (product?.price * quantity).toFixed(2) : '' }</span>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              <FaShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-500">
            No product selected
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}