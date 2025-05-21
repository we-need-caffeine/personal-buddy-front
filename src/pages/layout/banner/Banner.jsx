

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import S from './style'; // styled-components


const Banner = () => {
  return (
    <S.BannerWrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={true}
      >
        <SwiperSlide><img src="/assets/images/banner/banner-blue.png" alt="배너1" /></SwiperSlide>
        <SwiperSlide><img src="/assets/images/banner/banner-purple.png" alt="배너2" /></SwiperSlide>
        <SwiperSlide><img src="/assets/images/banner/banner-green.png" alt="배너3" /></SwiperSlide>
      </Swiper>
    </S.BannerWrapper>
  );
};

export default Banner;
