import React from 'react'
import AllProducts from '@/src/component/ClientComponent/Allproducts/AllProducts'
import { baseUrl } from '@/src/config/baseUrl'

export default async function page() {

  async function fetchProduct(){
      const res = fetch(`${baseUrl}/product`, { next : { revalidate:3600 } } )
      const data = (await res).json();
      return data;
  }
  
  const result = await fetchProduct();
  return (
    <>
        <div className='container-cus' >
            <div className='grid grid-cols-12 gap-4 py-8' >
                    <div className='lg:self-start lg:sticky lg:top-10 lg:col-span-2 col-span-12' >
                      <div className='pt-16 flex flex-col gap-4' >
                        {[1,2,3,4].map( (item)=>(
                          <p key={item} >item {item}</p>
                        ) )}
                      </div>
                    </div>
                    <div className='lg:col-span-10 col-span-12 ' >
                    <AllProducts allProducts={result?.data} />
                    </div>
            </div>
        </div>
    </>
  )
}