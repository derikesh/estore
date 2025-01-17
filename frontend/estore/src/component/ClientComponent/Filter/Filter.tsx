'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HorizontalFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFilterChange({ priceRange: value, sortOrder })
  }

  const handleSortChange = (value: 'asc' | 'desc') => {
    setSortOrder(value)
    onFilterChange({ priceRange, sortOrder: value })
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Price Range Filter */}
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="price-range" className="mb-2 block text-gray-900 dark:text-gray-100">Price Range</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
              className="w-20 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
            <Slider
              id="price-range"
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="flex-1 bg-black dark:bg-white "
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
              className="w-20 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Sort Order */}
        <div className="min-w-[150px]">
          <Label htmlFor="sort-order" className="mb-2 block text-gray-900 dark:text-gray-100">Sort by Price</Label>
          <Select value={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-order" className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="bg-gray-50 dark:bg-gray-700">
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters Button */}
        <Button onClick={() => onFilterChange({ priceRange, sortOrder })} className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}