import React from 'react'
import BigCard from '../Cards/BigCard'
import Cards from '../Cards/Cards'
import { FaArrowRightLong } from "react-icons/fa6";
import SwiperComp from '../Swiper.tsx/Swiper';
import { CATEGORY_INTERFACE } from '@/app/admin/dashboard/category/page';
import { PRODUCT_INTERFACE } from '@/app/admin/dashboard/product/page';

interface CategoryProps {
    data:CATEGORY_INTERFACE,
    products:PRODUCT_INTERFACE[]
}

export default function CategoryDisplay( {data,products}:CategoryProps  ) {


    console.log('from terminal',products);

    return (
        <div className="container-cus">
            <div className="cards_wrap py-8">
                <div className='flex flex-col lg:flex-row w-full gap-4'>
                    <BigCard content={data} className="w-full lg:w-[50%] mb-4 lg:mb-0" />

                    <div className='single_cards flex flex-col gap-4 w-full lg:w-[50%]'>
                        <div className='top_content text-2xl sm:text-3xl flex justify-between items-center'>
                            <p className=''>Trending</p>
                            <FaArrowRightLong className="text-xl sm:text-2xl" />
                        </div>

                        <div className='w-full'>
                            <SwiperComp perView={1} perViewLg={2} perViewMd={2} >
                                { products?.map( (item,index)=>(
                                    <Cards key={index} productDetail={item} />
                                ) ) }
                            </SwiperComp>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

