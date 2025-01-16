import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <div className=' bg-black rounded-tl-[60px] rounded-tr-[60px] flex flex-col gap-12 p-8 footer_content' >
            <div className='upper_content flex flex-col items-center justify-center gap-4' >
                <Image
                src={'/images/main.png'}
                alt='logo'
                className='rounded-[10px]'
                width={80}
                height={80}
                />
                <p>WALLA ESTORE</p>
                <div className='medias flex' >
                    <p>O</p>
                    <p>O</p>
                    <p>O</p>
                </div>
            </div>
            <div className=' lower_content pt-8 flex justify-between' >
                <p className='text-sm' >@Copyright all reservered 2025</p>
                <p className='text-sm' >thamel jytha , kathmandu</p>
            </div>
    </div>
  )
}
