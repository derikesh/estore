'use client'

import React from 'react'
import dynamic from 'next/dynamic'
const ReadProduct = dynamic( ()=>import('@/src/component/AdminComponents/Product/ReadProduct') , {
  ssr:false,
  loading: ()=><p>Loading...</p>,
} )

export default function page() {
  return (
    <div>
      <ReadProduct/>
    </div>
  )
}
