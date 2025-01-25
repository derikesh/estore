'use client'

import React, { useEffect, useState } from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

export default function LIkedProduct() {

  const [tabItem, setTabItem] = useState<any>(null);

  useEffect( ()=>{
  console.log("the active thing is",tabItem)

  },[tabItem] );


  const demoData = [ 
    {
      card:{
        id: 1,
      name: "Classic Hoodie",
      price: "$99",
      image: "/images/hoodie-1.avif",
      description: "A comfortable and stylish classic hoodie perfect for any occasion.",
      } ,
      detail:{
        image:['','',''],
        details:['']
      }
    },

   ]

  return (
    <>
      <div className='container-cus extra-products-wrap py-8'>
        <div className="flex flex-col lg:flex-row gap-8 md:p-8 ">
          <LeftContent tabItem={tabItem} className="lg:sticky lg:top-8 lg:self-start lg:w-1/2" title="You may also like" />
          <RightContent setTabItem={setTabItem} className="lg:w-1/2 space-y-6 pt-[60vh]" />
        </div>
      </div>
    </>
  )
}
