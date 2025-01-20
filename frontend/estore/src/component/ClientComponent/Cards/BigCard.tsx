import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

interface BigCardInterface extends React.HTMLAttributes<HTMLDivElement> {
}

export default function BigCard({ className }: BigCardInterface) {
  return (
    <div className={`big-card ${className} bg-white rounded-[20px] dark:bg-gray-800 shadow-xl flex gap-2 flex-col items-center py-8 px-4`} >
      <Image
        src={'/images/hoodie-1.avif'}
        alt='image-hoodie'
        width={300}
        height={300}
        className="w-full max-w-[300px] h-auto"
      />
      <div className='bcard-title text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white text-center'>MENS WEAR</div>
      <p className='text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base'>The men's waterproof sheer air caped jacket available on pre-orders</p>
      <Button className='mt-4' variant={'outline'}>Shop Now</Button>
    </div>
  );
}

