'use client'

import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

interface SwiperCompProps {
  children: ReactNode[];
  perView: number;
  perViewMd: number;
}

export default function SwiperComp({ children, perView, perViewMd }: SwiperCompProps) {
  return (
    <Swiper
      slidesPerView={perView}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: perViewMd,
        },
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

