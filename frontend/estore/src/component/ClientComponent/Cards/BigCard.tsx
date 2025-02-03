'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CATEGORY_INTERFACE } from '@/app/admin/dashboard/category/page';


interface BigCardInterface  {
  className:string,
  content:CATEGORY_INTERFACE
}

export default function BigCard({ className,content }: BigCardInterface) {
  const [hover, setHover] = useState(false);

  console.log('this is content',content);

  return (
    <div className={`big-card ${className} bg-white rounded-[8px] dark:bg-gray-800 shadow-xl flex gap-2 flex-col items-center py-8 px-4`}>
      <Image
        src={content.image.imageUrl}
        alt='image-hoodie'
        width={300}
        height={300}
        className={`w-full max-w-[300px] transition-transform h-auto ${hover ? 'scale-110' : ''}`}
      />
      <div className='bcard-title text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white text-center'>{content.name}</div>
      <p className='text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base'>{content.description}</p>
      <Button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className='mt-4 bg-transparent text-gray-900 dark:text-white border border-gray-900 dark:border-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-300'
        variant={'outline'}
      >
        Shop Now
      </Button>
    </div>
  );
}