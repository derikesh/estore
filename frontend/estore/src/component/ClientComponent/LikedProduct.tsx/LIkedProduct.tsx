'use client'

import React, { useEffect, useState } from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page'

interface SAMPLE_FEATURE_INTERFACE {
  id:number,
  name:string,
  x:number,
  y:number
}


export const sampleFeatures: SAMPLE_FEATURE_INTERFACE[] = [
  { id: 1, name: "Ergonomic Handle",  x: 20, y: 30 },
  { id: 2, name: "High-Resolution Display", x: 50, y: 50 },
  { id: 3, name: "Durable Casing", x: 80, y: 70 },
  { id: 4, name: "Advanced Cooling System", x: 30, y: 80 },
  { id: 5, name: "Precision Camera", x: 70, y: 20 },
]


const tabData = [

  { productName:'this that' , price:'123' , features:sampleFeatures } , 
  { productName:'product2' , price:'123' , features:sampleFeatures } , 
  { productName:'prduct3' , price:'123' , features:sampleFeatures } , 
  { productName:'product5' , price:'123' , features:sampleFeatures } , 
  { productName:'product6' , price:'123' , features:sampleFeatures } , 
  { productName:'product7' , price:'123' , features:sampleFeatures } , 
  { productName:'product8' , price:'123' , features:sampleFeatures } , 
]

interface DETAIL_PAGE_INTERFACE {
  data:PRODUCT_INTERFACE
}

export default function LikedProduct({data}:DETAIL_PAGE_INTERFACE) {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<any | null>(0);

  console.log("detail products",data);

  return (
    <>
      <div className='container-cus extra-products-wrap py-8'>
        <div className="flex flex-col-reverse lg:flex-row gap-6 md:p-8 ">
          {/* Pass activeTab and handleTabChange to child components */}
          <LeftContent 
            tabData={data}
            activeTab={activeTab} 
            // setTabItem={handleTabChange} 
            className="lg:sticky lg:top-8 lg:self-start lg:w-1/2" 
            title="You may also like" 
          />
          <RightContent 
            tabData={data}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            className="lg:w-1/2 space-y-6 lg:pt-[10vh]" 
          />
        </div>
      </div>
    </>
  );
}
