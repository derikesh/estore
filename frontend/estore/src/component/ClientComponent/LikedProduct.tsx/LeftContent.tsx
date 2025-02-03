"use client"

import React from "react"
import Image from "next/image"
import * as motion from "motion/react-client"
import { sampleFeatures } from "./LIkedProduct"

interface SECTION_INTERFACE {
  className?: string
  title: string
  activeTab: any | null
  setTabItem?: any
  tabData:any
}


export default function LeftContent({ className, title, tabData,activeTab  }: SECTION_INTERFACE) {

  return (
    <motion.div className={`dark:bg-gray-800 bg-white pb-2 rounded-lg shadow-md ${className}`}>
      <div className="max-w-2xl mx-auto h-full flex flex-col justify-center items-center">
        {/* <h2 className="text-3xl sm:text-3xl font-bold text-gray-900/80 dark:text-white my-4">{tabData[activeTab].productName}</h2> */}
        <div className="image_wraper relative">
          <Image src={"/images/ss.png"} height={600} width={600} alt="image" />

          <svg className="absolute h-full w-full top-0">
            {tabData?.[activeTab]?.features.map((feature:any) => (
              <g key={feature.id}>
                <line
                  x1={`${feature.x}%`}
                  y1={`${feature.y}%`}
                  x2={`${feature.id % 2 === 0 ? feature.x + 12 : feature.x - 12}%`}
                  y2={`${feature.y}%`}
                  stroke={feature.id % 2 === 0 ? "blue" : "red"}
                  strokeWidth="2"
                />
                <circle
                  cx={`${feature.x}%`}
                  cy={`${feature.y}%`}
                  r="5"
                />
              </g>
            ))}
          </svg>


          <div className=" h-full w-full top-0 ">
            {tabData?.[activeTab]?.features.map((feature:any,index:number) => (
              <div 
              key={index}
              className="absolute bg-white dark:text-black feature_label text-sm p-2 rounded-[3px]"
              style={{
                left: `${feature.id % 2 === 0 ? feature.x + 12 : feature.x - 24}%`,
                top: `${feature.y + 2}%`,
                // transform: "translate(-50%, -100%)",
              }} >
                this is test
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  )
}

