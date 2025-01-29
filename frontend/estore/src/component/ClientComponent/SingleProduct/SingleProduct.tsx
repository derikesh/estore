"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SwiperComp from "../Swiper.tsx/Swiper"
import { AddToCartModal } from "../Cart/Cart"
import { cn } from "@/lib/utils"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const colors = ["#FF0000", "#0000FF", "#008000", "#FFFF00"]
const sizes = ["S", "M", "L", "XL"]


const colorOptions = [
  { id: "red", colors: ["#FF0000"] },
  { id: "blue", colors: ["#0000FF"] },
  { id: "green", colors: ["#008000"] },
  { id: "yellow", colors: ["#FFFF00"] },
  { id: "red-blue", colors: ["#FF0000", "#0000FF"] },
  { id: "green-yellow", colors: ["#008000", "#FFFF00"] },
]


export default function SingleProductShowcase() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10))
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1))

  return (
    <div className="max-w-[1680px] mx-auto bg-background pb-16">
      <div className="flex flex-col lg:flex-row">
        {/* Image Swiper */}
        <div className="lg:w-2/3 space-y-6">
          {/* mobile view */}
          <div className="md:block lg:hidden">
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
          <div className="lg:block hidden">
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
              <Label className="text-sm font-medium block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-4">
                {colorOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={`color-${option.id}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${option.id}`}
                      className={cn(
                        "h-6 w-6 rounded-full cursor-pointer border opacity-80 dark:border-white/30 border-black/30 outline outline-2 dark:outline-white/50 outline-offset-2 outline-black/20 ring-offset-background transition-all hover:opacity-100",
                        selectedColor === option.id
                          ? "dark:ring-white ring-offset-2 outline outline-2 outline-offset-2 dark:outline-white outline-black"
                          : "",
                      )}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {option.colors.length === 1 ? (
                          <div className="w-full h-full" style={{ backgroundColor: option.colors[0] }} />
                        ) : (
                          <div className="flex flex-col w-full h-full">
                            <div className="w-full h-1/2" style={{ backgroundColor: option.colors[0] }} />
                            <div className="w-full h-1/2" style={{ backgroundColor: option.colors[1] }} />
                          </div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-4">
                {sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className={cn(
                        "flex items-center justify-center h-10 w-14 rounded border text-sm cursor-pointer transition-all",
                        "hover:bg-primary/10 hover:border-primary",
                        selectedSize === size
                          ? "border-2 border-blue-500"
                          : "bg-background text-foreground border-input",
                      )}
                    >
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

