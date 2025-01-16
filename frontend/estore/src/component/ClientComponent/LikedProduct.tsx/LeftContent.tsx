import React from 'react'

interface SECTION_INTERFACE {
    className?:any,
    title:string
}

export default function LeftContent({className,title}:SECTION_INTERFACE) {
  return (
    <div className={`bg-white ${className}`} >
        <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-black mb-4">Welcome to Our Platform</h1>
          </div>
    </div>
  )
}
