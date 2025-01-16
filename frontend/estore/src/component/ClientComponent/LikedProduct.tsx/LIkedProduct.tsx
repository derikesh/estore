import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

export default function LIkedProduct() {
  return (
    <>
        <div className='container-cus extra-products-wrap py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-8' >
                    <LeftContent className="lg:sticky lg:top-8 lg:self-start" title='You may also like' />
                    <RightContent className="space-y-6" />
                </div>
        </div>
    </>
  )
}
