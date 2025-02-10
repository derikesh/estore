import React from 'react';
import SingleProductShowcase from '@/src/component/ClientComponent/SingleProduct/SingleProduct';
import Faq from '@/src/component/ClientComponent/FAQ/Faq';
import SuggestCards from '@/src/component/ClientComponent/SuggestCards/SuggestCards';
import { baseUrl } from '@/src/config/baseUrl';

interface SINGLE_PRODUCT_DATA {
    id:string
}

const Page = async ({params}:{ params:{id:string} }) => {


    const fetchSingleProduct = async ()=>{
        const res = await fetch(`${baseUrl}/product/${params.id}?includeSuggestion=true`);
        const data = res.json();
        return data
}

// testing testtt
 
const resultData = await fetchSingleProduct();

console.log("product single",resultData);

  return (
      <div className='space-y-10' >
        <SingleProductShowcase singleProduct={resultData?.data?.singleData} />
        {/* <Faq data={{}} /> */}
        <SuggestCards singleProduct={resultData?.data?.suggestions} />
      </div>
  );
};

export default Page;