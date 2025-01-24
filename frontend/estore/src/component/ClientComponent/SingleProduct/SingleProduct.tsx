"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SwiperComp from "../Swiper.tsx/Swiper"
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
    <div className="mx-auto bg-background">
      <div className="flex flex-col lg:flex-row">
        {/* Image Swiper */}
        <div className="lg:w-2/3 space-y-6">

          {/* mobile view */}
        <div className="md:block lg:hidden" >
        <SwiperComp pagination perView={1} perViewMd={1} perViewLg={1}>
        {[1, 2, 3, 4].map((index) => (
              <div className="bg-white dark:bg-gray-800 flex h-[60vh] justify-center items-center p-8" key={index}>
                <Image
                  src={"/images/hoodie-1.avif"}
                  alt={`Product Image ${index}`}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            ))}
        </SwiperComp>
        </div>

        {/* desktop view */}
          <div className="lg:block hidden" >
            {[1, 2, 3, 4].map((index) => (
              <div className="bg-white dark:bg-gray-800 flex h-[90vh] justify-center items-center p-8" key={index}>
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
        <div className="lg:sticky lg:top-8 lg:self-start lg:w-1/3 space-y-8 bg-background p-8 h-screen rounded-lg overflow-y-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Modern Comfort Hoodie</h1>
            <p className="text-2xl font-semibold text-muted-foreground">$99.99</p>
          </div>

          <div className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label htmlFor="color-select" className="text-sm font-medium">
                Color
              </Label>
              <Select  value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select" className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black bg-white" >
                  {colors.map((color) => (
                    <SelectItem className="hover:cursor-pointer" key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-4">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-sm font-semibold">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                  <li>80% cotton, 20% polyester blend</li>
                  <li>Ribbed cuffs and waistband</li>
                  <li>Kangaroo pocket</li>
                  <li>Machine washable</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-sm font-semibold">Care Instructions</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Machine wash cold. Tumble dry low. Do not bleach. Wash inside out.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-6">
            <AddToCartModal product={null} icon={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

