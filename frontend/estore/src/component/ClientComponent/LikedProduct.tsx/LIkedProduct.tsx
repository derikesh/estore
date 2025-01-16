import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

export default function LIkedProduct() {
  return (
    <>
        <div className='container-cus extra-products-wrap py-8'>
                <div className='flex gap-2  h-[80vh] overflow-scroll relative' >
                    <LeftContent className="w-[50%] bg-white" title='You may also like' />
                    <RightContent className="w-[50%]" />
                </div>
        </div>
    </>
  )
}
