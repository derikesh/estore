"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { CATEGORY_INTERFACE } from "@/app/admin/dashboard/category/page"
import Link from "next/link"

interface SINGLE_CATEGORY{
  categoryData:CATEGORY_INTERFACE;
}

export default function CategoriesCard( {categoryData}:SINGLE_CATEGORY ) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
    href={`/all/${categoryData?._id}`}
      className="relative group flex hover:cursor-pointer items-center w-full max-w-sm mx-auto bg-white rounded-[10px] h-[390px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={categoryData?.image?.imageUrl} alt="Category Image" width={300} height={300} className="w-full h-auto" />
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="absolute bottom-4 left-4 text-xl font-bold"
        animate={{ color: isHovered ? "#000000" : "#FFFFFF" }}
        transition={{ duration: 0.4 }}
      >
        {categoryData?.name}
      </motion.div>
    </Link>
  )
}