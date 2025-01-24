"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FiMinus, FiPlus } from "react-icons/fi"

import { AddToCartModal } from "../Cart/Cart"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const colors = ["Red", "Blue", "Green", "Yellow"]
const sizes = ["S", "M", "L", "XL"]

export default function SingleProductShowcase() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  return (
    <div className="mx-auto bg-lime-200 dark:bg-[#141414]">
      <div className="flex flex-col lg:flex-row ">
        {/* Image Swiper */}
        <div className="lg:w-2/3 space-y-6">
          <div>
            {[1, 2, 3, 4].map((index) => (
              <div className="bg-white dark:bg-gray-800 flex h-screen justify-center items-center p-8" key={index}>
                <Image
                  src={"/images/hoodie-1.avif"}
                  alt={`Product Image ${index}`}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div
          className="lg:sticky lg:top-8 lg:self-start lg:w-1/3 space-y-4 bg-lime-200 dark:bg-[#141414] p-6 h-screen rounded-lg "
        >
          <div className="flex flex-col space-y-4 h-full overflow-y-auto">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Modern Comfort Hoodie</h1>
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">$99.99</p>
            </div>

            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Color</Label>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem value={color} id={`color-${color}`} />
                      <Label htmlFor={`color-${color}`} className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem value={size} id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`} className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button onClick={decrementQuantity} variant="outline" size="icon" className="h-8 w-8">
                    <FiMinus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <Button onClick={incrementQuantity} variant="outline" size="icon" className="h-8 w-8">
                    <FiPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <li>80% cotton, 20% polyester blend</li>
                    <li>Ribbed cuffs and waistband</li>
                    <li>Kangaroo pocket</li>
                    <li>Machine washable</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Machine wash cold. Tumble dry low. Do not bleach. Wash inside out.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-auto">
            <AddToCartModal product={null} icon={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

