import React from 'react'
import Cards from '../Cards/Cards'

export default function RightContent({className}:any) {
  return (
    <div className={` ${className}`} >
            <div className='flex flex-wrap' >
                <Cards className='m-auto my-4' />
                <Cards className='m-auto my-4' />
                <Cards className='m-auto my-4' />
                <Cards className='m-auto my-4' />
            </div>
    </div>
  )
}
