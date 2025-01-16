'use client'

import React, { useState } from 'react';
import Image from 'next/image';

export default function CategoriesCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group hover:cursor-pointer hover:bg-white flex items-center w-full max-w-sm mx-auto rounded-[10px] h-[390px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="/images/hoodie-1.avif"
        alt="Category Image"
        width={300}
        height={300}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-400"></div>
      <div
        className={`absolute bottom-4 left-4 text-xl font-bold transition-colors duration-400 ${
          isHovered ? 'text-black' : 'text-white'
        }`}
      >
        Category Title
      </div>
    </div>
  );
}