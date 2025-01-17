'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SwiperComp from '../Swiper.tsx/Swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const colors = ['Red', 'Blue', 'Green', 'Yellow']
const sizes = ['S', 'M', 'L', 'XL']

export default function SingleProductShowcase() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState('1')

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-gray-50 dark:bg-gray-900">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Swiper */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <SwiperComp pagination={true} perView={1} perViewMd={1}>
            {[1, 2, 3, 4].map((index) => (
              <div className='bg-white dark:bg-gray-800 flex justify-center items-center p-8' key={index}>
                <Image
                  src={'/images/hoodie-1.avif'}
                  alt={`Product Image ${index}`}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
            ))}
          </SwiperComp>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Modern Comfort Hoodie</h1>
            <p className="text-3xl font-semibold text-gray-700 dark:text-gray-300">$99.99</p>
          </div>

          <div className="space-y-6">
            {/* Color Selection */}
            <div>
              <Label htmlFor="color-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Color
              </Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color-select" className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex space-x-4">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem value={size} id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`} className="ml-2 text-gray-700 dark:text-gray-300">
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity Selection */}
            <div>
              <Label htmlFor="quantity-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Quantity
              </Label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger id="quantity-select" className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>80% cotton, 20% polyester blend for durability and softness</li>
                  <li>Ribbed cuffs and waistband for a snug fit</li>
                  <li>Kangaroo pocket for convenience</li>
                  <li>Machine washable for easy care</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100">Care Instructions</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To keep your Modern Comfort Hoodie looking its best, machine wash cold with like colors. 
                  Tumble dry on low heat. Do not bleach or iron the print directly. For best results, 
                  wash inside out to preserve the color and texture.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-full text-lg py-6" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}