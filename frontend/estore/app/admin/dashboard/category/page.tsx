'use client'

import React from 'react'
import dynamic from 'next/dynamic'
const ReadCategory =dynamic( ()=> import('@/src/component/AdminComponents/Category/ReadCategory') );

export default function page() {
  return (
    <div>
      <ReadCategory/>
    </div>
  )
}
