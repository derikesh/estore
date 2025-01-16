import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

interface CardsInterface extends React.HTMLAttributes<HTMLDivElement> {
  price?: string;
}

export default function Cards({ className, price = "SS" }: CardsInterface) {
  return (
    <div className={`relative big-card ${className} bg-white dark:bg-gray-800 shadow-xl flex gap-2 flex-col items-center py-8 px-4`} >
      <Image
        src={'/images/hoodie-1.avif'}
        alt='image-hoodie'
        width={250}
        height={250}
        className="w-full max-w-[250px] h-auto"
      />
      <div className='bcard-title text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center'>MENS WEAR</div>
      <p className='text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-4 text-center'>The men's waterproof sheer air caped jacket available on pre-orders</p>
      <Button className='mt-4' variant={'outline'}>Shop Now</Button>
      <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-[7px] text-xs">
        {price}
      </div>
    </div>
  );
}

