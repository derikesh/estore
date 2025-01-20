import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  price?: string;
  name?: string;
  sizes?: string[];
}

export default function ProductCard({ className, price = "$99", name = "Classic Hoodie", sizes = ["S", "M", "L", "XL"] }: ProductCardProps) {
  return (
    <div className={`relative  bg-white dark:bg-gray-800 shadow-lg rounded-[15px] overflow-hidden ${className}`}>
     <Link href={'/test2'} >
     <div className="aspect-square relative">
       <div className=' flex h-full justify-center items-center' >
       <Image
          src='/images/ss.png'
          alt='Product image'
          width={320}
          height={320}
          className=" transition-transform duration-300"
        />
       </div>
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-[10px] text-xs font-semibold">
          {price}
        </div>
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>{name}</h3>
        <div className='grid grid-cols-4 gap-2'>
          {sizes.map((size, index) => (
            <div 
              key={index} 
              className='text-center py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
            >
              {size}
            </div>
          ))}
        </div>
      </div></Link>
    </div>
  );
}




