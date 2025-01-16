import Image from 'next/image';
import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='footer_content bg-black  text-white dark:text-gray-200 rounded-tl-[60px] rounded-tr-[60px] flex flex-col gap-8 p-4 md:gap-16 md:p-8'>
      <div className='upper_content pt-8 flex flex-col items-center justify-center gap-4'>
        <Image
          src={'/images/main.png'}
          alt='logo'
          className='rounded-[10px]'
          width={70}
          height={70}
        />
        <p className='text-center text-lg md:text-xl'>WALLA ESTORE</p>
        <div className='medias flex gap-4'>
          <FaInstagram className='text-2xl' />
          <FaWhatsapp className='text-2xl' />
          <FaFacebook className='text-2xl' />
        </div>
      </div>
      <div className='lower_content pt-4 md:pt-8 flex flex-col md:flex-row justify-between items-center'>
        <p className='text-sm text-center md:text-left'>@Copyright all reserved 2025</p>
        <p className='text-sm flex items-center text-center md:text-left'>
          <FaMapMarkerAlt className='mr-2' />
          thamel jytha, kathmandu
        </p>
      </div>
    </div>
  );
}