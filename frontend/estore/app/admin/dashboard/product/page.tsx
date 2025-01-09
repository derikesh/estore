'use client'

import React, { useCallback } from 'react'
import ReadProduct from '@/src/component/AdminComponents/Product/ReadProduct'
import { usePrefetch } from '@/src/store/rtkQuery'

export default function Page() {

  // const productData = usePrefetch('readallProduct');

  // const callPrefetch = useCallback( ()=>{
  //   productData({});
  // } ,[productData])

  // callPrefetch();


  return (
    <div>
      <ReadProduct />
    </div>
  )
}
