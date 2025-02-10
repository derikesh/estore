"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HorizontalFilter({
  onFilterChange,
  maxPrice,
}: { onFilterChange: (filters: any) => void; maxPrice: number }) {
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFilterChange({ priceRange: value, sortOrder })
  }

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value)
    onFilterChange({ priceRange, sortOrder: value })
  }

  return (
    <div className="w-full bg-background p-8 rounded-lg shadow-sm">
      <div className="flex flex-col lg:flex-row gap-8 items-end">
        {/* Price Range Filter */}
        <div className="flex-1 space-y-4">
          <Label htmlFor="price-range" className="text-sm font-medium">
            Price Range
          </Label>
          <div className="space-y-6">
            <Slider
              id="price-range"
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Sort Order */}
        <div className="w-full lg:w-48 space-y-4">
          <Label htmlFor="sort-order" className="text-sm font-medium">
            Sort by Price
          </Label>
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-order">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="dark:bg-white bg-[#252525] text-white dark:text-black" >
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

