'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DisplayProduct() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/all')
  }

  return (
    <div className="container-cus w-[90%] relative h-64 rounded-[20px] overflow-hidden !my-20 shadow-md">
      <img
        src="https://via.placeholder.com/800x400?text=Product+Image"
        alt="Product Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h2 className="text-2xl font-bold mb-4">Explore All Products</h2>
        <Button onClick={handleRedirect} className="bg-white text-black">
          View All
        </Button>
      </div>
    </div>
  )
}