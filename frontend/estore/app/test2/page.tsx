import React from 'react';
import SingleProductShowcase from '@/src/component/ClientComponent/SingleProduct/SingleProduct';
import Faq from '@/src/component/ClientComponent/FAQ/Faq';
import SuggestCards from '@/src/component/ClientComponent/SuggestCards/SuggestCards';

const Page = async () => {

  return (
    <div >
      <div >
        <SingleProductShowcase />
        <Faq />
        <SuggestCards/>
      </div>
    </div>
  );
};

export default Page;