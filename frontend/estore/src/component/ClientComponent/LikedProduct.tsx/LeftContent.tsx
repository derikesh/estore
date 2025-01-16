import React from 'react'

interface SECTION_INTERFACE {
    className?:any,
    title:string
}

export default function LeftContent({className,title}:SECTION_INTERFACE) {
  return (
    <div className={`bg-white ${className}`} >
            s
    </div>
  )
}
