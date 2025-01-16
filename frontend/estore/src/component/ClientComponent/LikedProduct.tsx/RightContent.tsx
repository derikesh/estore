import React from 'react'
import Cards from '../Cards/Cards'

export default function RightContent({className}:any) {
  return (
    <div className={`bg-white ${className}`} >
            <div className='flex flex-wrap' >
                <Cards className='overflow-hidden' />
                <Cards className='overflow-hidden' />
                <Cards className='overflow-hidden' />
                <Cards className='overflow-hidden' />
            </div>
    </div>
  )
}
