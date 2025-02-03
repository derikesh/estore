"use client"

import React from "react"
import TabCard from "../Cards/TabCard"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RightContent({ className, setActiveTab = () => {}, tabData, activeTab }: any) {

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 snap-y">
        {/* Desktop view */}
        {tabData.map((item: any, index: number) => (
          <motion.div
            key={index}
            className={`hover:cursor-pointer lg:block hidden m-auto ${index === activeTab ? "border-4 rounded-[8px] border-blue-500" : ""}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => {
              e.stopPropagation()
              setActiveTab(index)
            }}
          >
            <TabCard />
          </motion.div>
        ))}

        
      </div>


        {/* Mobile view */}
        <div className="lg:hidden block !w-full">
          <Select onValueChange={(value) => setActiveTab(Number(value))} defaultValue={activeTab.toString()}>
            <SelectTrigger className="w-full text-xl p-6">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent className="bg-white !text-xl" >
              {tabData.map((item: any, index: number) => (
                <SelectItem className="text-xl" key={index} value={index.toString()}>
                  {item.productName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

    </div>
  )
}

