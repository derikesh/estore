import React from 'react'
import SwiperComp from '../Swiper.tsx/Swiper'
import HeadingComp from '../Heading/Heading';
import CategoriesCard from '../Cards/CategoriesCard';

export default function Categories() {

    console.log("all rerendered");

    return (
        <div className="container-cus">
            <div className="categories_wrap py-8">
                <HeadingComp title='More Category' />
                
                <div className='wrap_categories_content py-4' >
                <SwiperComp  perView={1} perViewMd={2} perViewLg={4}>
                   <CategoriesCard/>
                   <CategoriesCard/>
                   <CategoriesCard/>
                </SwiperComp>
                </div>

            </div>
        </div>
    )
}

