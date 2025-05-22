import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import S from './style';
import { Autoplay } from 'swiper/modules';

const Banner = () => {
  const [swiper, setSwiper] = useState('');
  const totalSlides = 3;
  const [activeIndex, setActiveIndex] = useState(0);


  const handleDotClick = (index) => {
    if (!swiper) return;
    swiper.slideToLoop(index);
    setActiveIndex(index);
    swiper.autoplay?.start();
  };

  return (
    <S.BannerWrapper>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => setSwiper(swiper)}
        allowTouchMove={true}
        navigation={false}
        pagination={false}
      >
        <SwiperSlide>
          <img src="/assets/images/banner/banner-blue.png" alt="배너1" />
          <S.Banner1Text>
            <S.bannerTitle>나의 업적</S.bannerTitle>
            <div>버디들의 업적을 <br/> 확인해보세요!</div>
          </S.Banner1Text>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/assets/images/banner/banner-purple.png" alt="배너2" />
           <S.Banner2Text>
            <S.bannerTitle>성장 나무</S.bannerTitle>
            <div>버디들의 성장나무는 <br/> 확인해보세요!</div>
          </S.Banner2Text>
        </SwiperSlide>

        <SwiperSlide>
          <img src="/assets/images/banner/banner-green.png" alt="배너3" />
          <S.Banner2Text>
            <S.bannerTitle>나의 업적</S.bannerTitle>
            <div>버디들의 업적을 <br/> 확인해보세요!</div>
          </S.Banner2Text>
        </SwiperSlide>
      </Swiper>
      
         <S.DotsContainer>
        {[...Array(totalSlides)].map((_, i) => (
          <S.Dot
            key={i}
            active={activeIndex === i}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </S.DotsContainer>

    </S.BannerWrapper>
  );
};

export default Banner;
