"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HorizontalFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState([0, 1000])
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
    <div className="w-full bg-background p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-6 items-end">
        {/* Price Range Filter */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="price-range" className="text-sm font-medium">
            Price Range
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
              className="w-20"
            />
            <Slider
              id="price-range"
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="flex-1 bg-white "
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
              className="w-20"
            />
          </div>
        </div>

        {/* Sort Order */}
        <div className="w-full sm:w-48 space-y-2">
          <Label htmlFor="sort-order" className="text-sm font-medium">
            Sort by Price
          </Label>
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-order">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters Button */}
        <Button onClick={() => onFilterChange({ priceRange, sortOrder })} className="w-full sm:w-auto">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

