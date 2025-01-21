import React from 'react'
import Cards from '../Cards/Cards'
import { HorizontalFilter } from '../Filter/Filter'

export default function AllProducts() {

  const serverFunction = async () => {
    'use server'
    return null
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <HorizontalFilter onFilterChange={serverFunction} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {Array(10).fill(null).map((_, index) => (
          <Cards key={index} />
        ))}
      </div>
    </div>
  )
}