import React, { useEffect, useState } from 'react';
import S from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';

const EventBannerContainer = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/current`)
      .then(res => res.json())
      .then(data => {
        setBanners(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('진행중인 이벤트 배너 불러오기 실패:', err));
  }, []);

  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>

      <S.BannerSliderWrapper>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          slidesPerView={2}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 400,
            modifier: 1,
            slideShadows: false,
          }}
        >
          {banners.map((event) => {
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${event.eventImgPath}&fileName=${event.eventImgName}`;
            return (
              <SwiperSlide key={event.id}>
                <Link to={`read/${event.id}`}>
                  <S.BannerCard>
                    <img
                      src={imageUrl}
                      alt={event.eventTitle}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/board/default/default-img.png';
                      }}
                    />
                  </S.BannerCard>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </S.BannerSliderWrapper>
    </S.EventWrapper>
  );
};

export default EventBannerContainer;
