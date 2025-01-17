import React from 'react'
import AllProducts from '@/src/component/ClientComponent/Allproducts/AllProducts'

export default function page() {
  return (
    <>
        <div className='container-cus' >
            <div className='grid grid-cols-12 gap-4 py-8' >
                    <div className='lg:self-start lg:sticky lg:top-10 lg:col-span-2 col-span-12' >all the filters</div>
                    <div className='lg:col-span-10 col-span-12' >
                    <AllProducts/>
                    </div>
            </div>
        </div>
    </>
  )
}
