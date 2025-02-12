"use client"

import { useState, useEffect } from "react"
import Cards from "../Cards/Cards"
import { HorizontalFilter } from "../Filter/Filter"
import type { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"

export interface ALL_INTERFACE {
  allProducts: any
}

export default function AllProducts({ allProducts }: ALL_INTERFACE) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const maxPrice = Math.max(...allProducts?.map((product) => product.price))
  const [filters, setFilters] = useState({ priceRange: [0, maxPrice], sortOrder: "asc" })


  console.log("allPRODUCTS",allProducts)

  useEffect(() => {
    const result = allProducts?.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    result.sort((a, b) => {
      if (filters.sortOrder === "asc") {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })

    setFilteredProducts(result)
  }, [filters, allProducts])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <HorizontalFilter onFilterChange={handleFilterChange} maxPrice={maxPrice} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredProducts.map((item, index) => (
          <Cards productDetail={item} key={index} />
        ))}
      </div>
    </div>
  )
}

