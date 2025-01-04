'use client'

import React from 'react'
import dynamic from 'next/dynamic'


const ReadCategory = dynamic(() => import('@/src/component/AdminComponents/Category/ReadCategory'), {
  ssr: false,
  loading: ()=><p>Loading...</p>,
});

export default function Page() {
  return (
    <div>
      <ReadCategory />
    </div>
  );
}