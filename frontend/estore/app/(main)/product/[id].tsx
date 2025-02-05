import React from 'react';
import SingleProductShowcase from '@/src/component/ClientComponent/SingleProduct/SingleProduct';
import Faq from '@/src/component/ClientComponent/FAQ/Faq';
import SuggestCards from '@/src/component/ClientComponent/SuggestCards/SuggestCards';
import { baseUrl } from '@/src/config/baseUrl';

interface SINGLE_PRODUCT_DATA {
    id:string
}



const Page = async ({id}:SINGLE_PRODUCT_DATA) => {

    const fetchSingleProduct = async ()=>{
        const res = await fetch(`${baseUrl}/product/${id}`)
        const data = res.json();
        return data
}
 
const resultData = await fetchSingleProduct();

console.log("product single",resultData);

  return (
      <div className='space-y-10' >
        <SingleProductShowcase />
        {/* <Faq data={{}} /> */}
        {/* <SuggestCards/> */}
      </div>
  );
};

export default Page;