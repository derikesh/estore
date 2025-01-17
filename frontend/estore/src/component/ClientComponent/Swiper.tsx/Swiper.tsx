'use client'

import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

interface SwiperCompProps {
  children: ReactNode[];
  perView: number;
  pagination?: boolean;
  perViewMd: number;
}

export default function SwiperComp({ children, perView, perViewMd, pagination = false }: SwiperCompProps) {
  return (
    <Swiper
      slidesPerView={perView}
      spaceBetween={15}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: perViewMd,
        },
      }}
      pagination={pagination ? { clickable: true } : false}
      modules={[Autoplay, ...(pagination ? [Pagination] : [])]}
      className="mySwiper"
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}