import React from 'react'
import AllProducts from '@/src/component/ClientComponent/Allproducts/AllProducts'
import { baseUrl } from '@/src/config/baseUrl'
import SideFilter from '@/src/component/ClientComponent/SideFilter/SideFilter';


const sideMenu =  [
  { key:'All Product' , route:'/all' },
  { key:'M' }
]

export default async function page() {

  async function fetchProduct(category){
      const res = fetch(`${baseUrl}/product?includeCategory=true`, { next : { revalidate:3600 } } );
      const data = (await res).json();
      return data;
  }


  const result = await fetchProduct({});
  
  console.log("resss",result);

  return (
    <>
        <div className='container-cus' >
            <div className='grid grid-cols-12 gap-4 py-8' >
                    <div className='lg:self-start lg:sticky lg:top-10 lg:col-span-2 col-span-12' >
                      <SideFilter result={result} />
                    </div>
                    <div className='lg:col-span-10 col-span-12 ' >
                    <AllProducts allProducts={result?.data?.allData || result?.data?.productCategoryes} />
                    </div>
            </div>
        </div>
    </>
  )
}