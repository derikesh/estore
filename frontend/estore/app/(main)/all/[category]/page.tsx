import React from 'react';
import AllProducts from '@/src/component/ClientComponent/Allproducts/AllProducts';
import { baseUrl } from '@/src/config/baseUrl';
import SideFilter from '@/src/component/ClientComponent/SideFilter/SideFilter';

export default async function page({ params }:{params:{category:string}}) {

    const { category } = params;

    async function fetchProduct() {
        const res = await fetch(`${baseUrl}/product?includeCategory=true&selectedCategory=${category}`, { next: { revalidate: 3600 } });
        const data = (await res).json();
        return data;
    }
    const result = await fetchProduct();

    console.log("resultttt",result);

    return (
        <div className='container-cus' >
            <div className='grid grid-cols-12 gap-4 py-8' >
                <div className='lg:self-start lg:sticky lg:top-10 lg:col-span-2 col-span-12' >
                    <SideFilter result={result?.data?.categories || result?.data?.category} />
                </div>
                <div className='lg:col-span-10 col-span-12 ' >
                    <AllProducts allProducts={result?.data?.allProducts || result?.data?.products} />
                </div>
            </div>

        </div>
    )
}
// test`