import React from 'react';
import SingleProductShowcase from '@/src/component/ClientComponent/SingleProduct/SingleProduct';
import Faq from '@/src/component/ClientComponent/FAQ/Faq';
import SuggestCards from '@/src/component/ClientComponent/SuggestCards/SuggestCards';

const Page = async () => {

  return (
      <div className='space-y-10' >
        <SingleProductShowcase />
        <Faq />
        <SuggestCards/>
      </div>
  );
};

export default Page;