import React from 'react'
import './Home.css'

import { Swiper, SwiperSlide } from 'swiper/react';


const Home = () => {
  return (
    <div className='homeDesign'>
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className='block'>Slide 1</SwiperSlide>
      <SwiperSlide className='block'>Slide 2</SwiperSlide>
      <SwiperSlide className='block'>Slide 3</SwiperSlide>
      <SwiperSlide className='block'>Slide 4</SwiperSlide>
      ...
    </Swiper>
    </div>
  )
}

export default Home