'use client'

import React, { useEffect, useState } from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'


export const sampleFeatures: any[] = [
  { id: 1, name: "Ergonomic Handle", description: "Comfortable grip for extended use", x: 20, y: 30 },
  { id: 2, name: "High-Resolution Display", description: "Crystal clear 4K screen", x: 50, y: 50 },
  { id: 3, name: "Durable Casing", description: "Shock-resistant outer shell", x: 80, y: 70 },
  { id: 4, name: "Advanced Cooling System", description: "Prevents overheating during intense usage", x: 30, y: 80 },
  { id: 5, name: "Precision Camera", description: "Capture stunning photos and videos", x: 70, y: 20 },
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

export default function LikedProduct() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<any | null>(0);


  console.log("this is client side");
  return (
    <>
      <div className='container-cus extra-products-wrap py-8'>
        <div className="flex flex-col-reverse lg:flex-row gap-6 md:p-8 ">
          {/* Pass activeTab and handleTabChange to child components */}
          <LeftContent 
            tabData={tabData}
            activeTab={activeTab} 
            // setTabItem={handleTabChange} 
            className="lg:sticky lg:top-8 lg:self-start lg:w-1/2" 
            title="You may also like" 
          />
          <RightContent 
            tabData={tabData}
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            className="lg:w-1/2 space-y-6 lg:pt-[30vh]" 
          />
        </div>
      </div>
    </>
  );
}
