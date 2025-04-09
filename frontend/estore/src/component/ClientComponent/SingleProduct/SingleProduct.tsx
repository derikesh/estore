"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SwiperComp from "../Swiper.tsx/Swiper"
import { AddToCartModal } from "../Cart/Cart"
import { cn } from "@/lib/utils"
import { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"
import { StoreCart } from "../Cart/StoreCart"
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const sizes = ["S", "M", "L", "XL"]

interface PAGE_SINGLE_INTERFACE {
  singleProduct: PRODUCT_INTERFACE;
}

export default function SingleProductShowcase({ singleProduct }: PAGE_SINGLE_INTERFACE) {
  const [selectedSize, setSelectedSize] = useState<string | null>(singleProduct?.sizes[0] as string)
  const [selectedColor, setSelectedColor] = useState<string | null>(singleProduct?.color[0] as string)

  return (
    <div className="max-w-[1680px] mx-auto bg-background pb-16">
      <div className="flex flex-col lg:flex-row">
        {/* Image Swiper */}
        <div className="lg:w-2/3 space-y-6">
          {/* mobile view */}
          <div className="md:block lg:hidden">
            <SwiperComp pagination perView={1} perViewMd={1} perViewLg={1}>
              {singleProduct?.productImages?.map((item, index) => (
                <div className="bg-white dark:bg-gray-800 flex h-[60vh] justify-center items-center p-8" key={index}>
                  <Image
                    src={item?.imageUrl}
                    alt={`Product Image ${index}`}
                    width={700}
                    height={700}
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
            </SwiperComp>
          </div>

          {/* desktop view */}
          <div className="lg:block hidden">
            {singleProduct?.productImages?.map((item, index) => (
              <div className="bg-white dark:bg-gray-800 flex h-[90vh] justify-center items-center p-[13rem]" key={index}>
                <Image
                  src={item?.imageUrl}
                  alt={`Product Image ${index}`}
                  layout="responsive"
                  width={400}
                  height={400}
                  className=""
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="lg:sticky lg:top-8 lg:self-start lg:w-1/3 space-y-8 bg-background p-8 h-screen rounded-lg overflow-y-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{singleProduct?.name}</h1>
            <p className="text-2xl font-semibold text-muted-foreground">${singleProduct?.price}</p>
          </div>

          <div className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-4">
                {singleProduct?.color?.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={color as string} id={`color-${color}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className={cn(
                        "h-6 w-6 rounded-full cursor-pointer border opacity-80 dark:border-white/30 border-black/30 outline outline-2 dark:outline-white/50 outline-offset-2 outline-black/20 ring-offset-background transition-all hover:opacity-100",
                        selectedColor === color
                          ? "dark:ring-white ring-offset-2 outline outline-2 outline-offset-2 dark:outline-white outline-black"
                          : "",
                      )}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: color as string }} />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-4">
                {singleProduct?.sizes?.map((size) => (
                  <div key={size as string}>
                    <RadioGroupItem value={size as string} id={`size-${size}`} className="sr-only" />
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
                      {size ? size : "Xl"}
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
                {singleProduct?.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-6">
            <StoreCart product={singleProduct} icon={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
