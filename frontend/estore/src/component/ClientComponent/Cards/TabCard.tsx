"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { FaArrowRight } from "react-icons/fa"
import { PRODUCT_INTERFACE } from "@/app/admin/dashboard/product/page"

interface TAB_CARD_INTERFACE {
  data:PRODUCT_INTERFACE
}

export default function TabCard({data}:TAB_CARD_INTERFACE) {
  return (
    <div className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-[7px] overflow-hidden group`}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={data?.images?.imageUrl}
          alt={`${data?.name} image`}
          width={350}
          height={350}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {data?.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{data?.name}</h3>
        <Link
          href={`/product/${data?._id}`}
          className="inline-flex text-sm items-center justify-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          View Details
          <FaArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}