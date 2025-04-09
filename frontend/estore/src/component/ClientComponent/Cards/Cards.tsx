'use client '

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?:string,
  productDetail:PRODUCT_INTERFACE
}

export default function ProductCard({
  className,
  productDetail
}: ProductCardProps) {

  return (
    <div className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-[7px] overflow-hidden group ${className}`}>
      <Link href={`/product/${productDetail?._id}`}>
        <div className="aspect-square relative overflow-hidden">
          <div className="flex h-full justify-center items-center">
            <Image
              src={productDetail?.images?.imageUrl}
              alt="Product image"
              width={350}
              height={350}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-[10px] text-xs font-semibold">
            RS : {productDetail?.price}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 flex items-center gap-2 justify-end pr-4">
              { productDetail?.color?.map( (item,index)=>(
              <input disabled type="color" value={item as any} key={index} className={`bg-${item} h-[20px] w-[45px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out`}/>

               )) }
                <span className="sr-only">colors</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{productDetail?.name}</h3>
          <div className="grid grid-cols-4 gap-2">
            {  productDetail?.sizes?.map((size, index) => (
              <div
                key={index}
                className="uppercase text-center py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {size ? size : "Xl"} 
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

