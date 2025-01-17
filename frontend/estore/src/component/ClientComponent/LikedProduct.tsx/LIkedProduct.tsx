import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

export default function LIkedProduct() {
  return (
    <>
      <div className='container-cus extra-products-wrap py-8'>
        <div className="flex flex-col lg:flex-row gap-8 md:p-8">
          <LeftContent className="lg:sticky lg:top-8 lg:self-start lg:w-1/2" title="You may also like" />
          <RightContent className="lg:w-1/2 space-y-6" />
        </div>
      </div>
    </>
  )
}
