"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DisplayProduct() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push("/all")
  }

  return (
    <div className="container-cus w-[90%] relative h-64  rounded-[20px] overflow-hidden !my-20 shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px]">
      <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-[18px]"></div>
      <div className="relative z-10 flex flex-col -white items-center justify-center h-full text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Explore All Products</h2>
        <Button
          onClick={handleRedirect}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300"
        >
          View All
        </Button>
      </div>
    </div>
  )
}

