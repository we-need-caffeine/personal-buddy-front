import React, { useEffect, useState } from 'react';
import S from './style';
import SwiperCore from "swiper/core";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import { Link } from 'react-router-dom';
SwiperCore.use([Autoplay]);

const EventBannerContainer = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/current`)
    .then(res => res.json())
    .then(data => {
      // console.log('배너 데이터 확인', data);
      setBanners(data);
    });
  }, []);

  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>

      <S.BannerSliderWrapper>
        <Swiper
          spaceBetween={0}
          modules={[EffectCoverflow]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={'coverflow'}
          centeredSlides={true}
          // slidesPerView={'auto'}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 350,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >

          {banners.map((event, i) => { 
            // console.log(event);
            const filePath = event.eventImgPath; 
            const fileName = event.eventImgName;
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${ filePath}&fileName=${(fileName)}`;
            
            return (
            <SwiperSlide key={i}>
              <Link to={`/main/community/event/post/${event.id}`}>
                <S.BannerCard>
                  <img src={encodeURI(imageUrl)} alt="이벤트 배너" />

                </S.BannerCard>
              </Link>
            </SwiperSlide>

          )})}
        </Swiper>
      </S.BannerSliderWrapper>
    </S.EventWrapper>


  );
};

export default EventBannerContainer;
