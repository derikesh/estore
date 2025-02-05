import React from 'react'
import Cards from '../Cards/Cards'
import { HorizontalFilter } from '../Filter/Filter'
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page'


export interface ALL_INTERFACE {
  allProducts:PRODUCT_INTERFACE[];
}

export default function AllProducts({allProducts}:ALL_INTERFACE) {


  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <HorizontalFilter onFilterChange={null} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {allProducts?.map((item, index) => (
          <Cards productDetail={item} key={index} />
        ))}
      </div>
    </div>
  )
}