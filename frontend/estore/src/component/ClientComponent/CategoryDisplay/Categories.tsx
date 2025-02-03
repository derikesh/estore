'use client'

import React from 'react'
import SwiperComp from '../Swiper.tsx/Swiper'
import HeadingComp from '../Heading/Heading';
import CategoriesCard from '../Cards/CategoriesCard';
import type { Variants } from "motion/react"
import * as motion from 'motion/react-client';

import { CATEGORY_INTERFACE } from '@/app/admin/dashboard/category/page';

interface CATEGORY_PROPS {
  data:CATEGORY_INTERFACE[]
}

export default function Categories({data}:CATEGORY_PROPS) {


  console.log("this is category data",data);

    const animationVariant: Variants = {
        offscreen: {
          y: 120,
          opacity: 0,
        },
        onscreen: (index: number) => ({
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.5,
            delay: index * 0.2, // Add a delay based on the index
          },
        }),
      }

    return (
        <div className="container-cus">
            <div className="categories_wrap py-8 space-y-4">
                <HeadingComp title='More Category' />
                
                <div className='wrap_categories_content py-4' >
                <SwiperComp perView={1} perViewMd={2} perViewLg={4}>
                {data?.map((item,index) => (
              <motion.div
                key={index}
                initial="offscreen"
                viewport={{ once: true }}
                whileInView="onscreen"
                variants={animationVariant}
                custom={index} // Pass the index as a custom prop
              >
                <CategoriesCard categoryData={item} />
              </motion.div>
            ))}
                </SwiperComp>
                </div>

            </div>
        </div>
    )
}

