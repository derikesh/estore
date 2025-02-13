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


export default function LeftContent({ className, tabData,activeTab  }: SECTION_INTERFACE) {

  return (
    <motion.div className={`dark:bg-gray-800 bg-white pb-2 rounded-lg shadow-md ${className}`}>
      <div className="max-w-2xl mx-auto h-full flex flex-col justify-center items-center">
        {/* <h2 className="text-3xl sm:text-3xl font-bold text-gray-900/80 dark:text-white my-4">{tabData[activeTab].productName}</h2> */}
        <div className="image_wraper relative">
          <Image src={tabData?.[activeTab]?.images?.imageUrl} height={600} width={600} alt="image" />

          <svg className="absolute h-full w-full top-0 ">
            {tabData?.[activeTab]?.features.map((feature:any,index:number) => (
              <g key={index}>
                <line
                  x1={`${feature.x+2}%`}
                  y1={`${feature.y+2}%`}
                  x2={`${index % 2 === 0 ? feature.x + 14 : feature.x - 16}%`}
                  y2={`${feature.y+2}%`}
                  stroke={index % 2 === 0 ? "blue" : "blue"}
                  strokeWidth="2"
                />
                <circle
                  cx={`${feature.x + 2}%`}
                  cy={`${feature.y + 2}%`}
                  r="5"
                  fill="black"
                />
              </g>
            ))}
          </svg>


          <div className=" h-full w-full top-0 ">
            {tabData?.[activeTab]?.features.map((feature:any,index:number) => (
              <div 
              key={index}
              className="absolute w-fit dark:bg-white.40 bg-black/50 dark:text-white text-white feature_label text-sm px-2 rounded-[3px]"
              style={{
                left: `${index % 2 === 0 ? feature.x + 12 : feature.x - 24}%`,
                top: `${feature.y + 2}%`,
                transform: `${index % 2 === 0 ? 'translate(10%, -50%)' : 'translate(-70%, -50%)' }`,
              }} >
                {feature.name}
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  )
}

