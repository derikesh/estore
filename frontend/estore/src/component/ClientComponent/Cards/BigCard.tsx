'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BigCardInterface extends React.HTMLAttributes<HTMLDivElement> {
}

export default function BigCard({ className }: BigCardInterface) {
  const [hover, setHover] = useState(false);

  return (
    <div className={`big-card ${className} bg-white rounded-[8px] dark:bg-gray-800 shadow-xl flex gap-2 flex-col items-center py-8 px-4`}>
      <Image
        src={'/images/hoodie-1.avif'}
        alt='image-hoodie'
        width={300}
        height={300}
        className={`w-full max-w-[300px] transition-transform h-auto ${hover ? 'scale-110' : ''}`}
      />
      <div className='bcard-title text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white text-center'>MENS WEAR</div>
      <p className='text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base'>The men's waterproof sheer air caped jacket available on pre-orders</p>
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