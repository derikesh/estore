"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { FaArrowRight } from "react-icons/fa"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  price?: string
  name?: string
  imageSrc?: string
}

export default function TabCard({
  className,
  price = "$99",
  name = "Classic Hoodie",
  imageSrc = "/images/ss.png",
}: ProductCardProps) {
  return (
    <div className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-[7px] overflow-hidden group ${className}`}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`${name} image`}
          width={350}
          height={350}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{name}</h3>
        <Link
          href="/test2"
          className="inline-flex text-sm items-center justify-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          View Details
          <FaArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}