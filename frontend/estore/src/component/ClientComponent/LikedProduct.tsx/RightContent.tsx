'use client'

import React from 'react'
import Cards from '../Cards/Cards'
import { motion, Variants } from 'framer-motion'

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.5,
      delay: 0.2,
    },
  },
}

export default function RightContent({ className , setTabItem = ()=>{} }: any) {


  return (
    <div className={` ${className}`}>
      <div className='flex flex-wrap snap-y'>
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className={`m-auto my-8 ${index === 3 ? 'pb-[15vh]' : ''}`}
            initial="offscreen"
            whileInView={"onscreen" }
            viewport={{ once: false, amount: 0.5 }} 
            onViewportEnter={() => setTabItem(index)}
            // onViewportLeave={ index === 0 ? () => setTabItem(null) : undefined}
            variants={cardVariants}
            custom={index}
          >
            <Cards />
          </motion.div>
        ))}
      </div>
    </div>
  )
}