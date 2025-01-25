'use client'

import React from 'react'
import Image from 'next/image'
import { useScroll } from 'motion/react'
import * as motion from 'motion/react-client';

interface SECTION_INTERFACE {
    className?: string,
    title: string,
    tabItem: number | null
}

export default function LeftContent({ className, title, tabItem }: SECTION_INTERFACE) {
  return (
    <motion.div className={` ${tabItem === null ? '' : 'dark:bg-gray-800 bg-white p-6'}  rounded-lg shadow-md ${className}`}>
      <div className="max-w-2xl mx-auto h-full flex justify-center items-center">
        {tabItem === null ? (
          <h2 className="text-3xl lg:h-[80vh] sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src="/images/hoodie.webp"
              alt="Selected Item"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}