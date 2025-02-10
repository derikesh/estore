import React from 'react'
import SwiperComp from '../Swiper.tsx/Swiper'
import Cards from '../Cards/Cards'
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page'
import { baseUrl } from '@/src/config/baseUrl'

interface SUGGEST_PAGE_PROP{
  singleProduct:PRODUCT_INTERFACE[]
}

export default function SuggestCards({singleProduct}:SUGGEST_PAGE_PROP) {

  console.log("Suggestion card",singleProduct);


  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10   rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">You May Also Like</h2>
      <SwiperComp pagination={false} perView={1} perViewLg={3} perViewMd={3}>
        {singleProduct.map((item:any) => (
          <div key={item.id} className="p-4">
            <Cards productDetail={item} />
          </div>
        ))}
      </SwiperComp>
    </div>
  )
}