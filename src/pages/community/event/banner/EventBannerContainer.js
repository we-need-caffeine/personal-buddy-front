import React, { useEffect, useState } from 'react';
import S from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const EventBannerContainer = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/current`)
    .then(res => res.json())
    .then(data => {
      console.log('배너 데이터 확인', data);
      setBanners(data);
    });
  }, []);


  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>

      <S.BannerSliderWrapper>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1.5}
          grabCursor={true}
        >
          {banners.map((event, i) => {
            const parts = event.thumbnailUrl?.split('/');
            const filePath = parts?.slice(0, -1).join('/');
            const fileName = parts?.slice(-1)[0];
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${filePath}&fileName=${fileName}`;
            console.log("이미지 경로", imageUrl);

            return (
              <SwiperSlide key={i}>
                <S.BannerCard>
                  <img src={imageUrl} alt="이벤트 배너" />
                </S.BannerCard>
              </SwiperSlide>
            );
          })}
          <div>{banners.length === 0 }진행중인 이벤트가 없습니다.</div>
        </Swiper>
      </S.BannerSliderWrapper>
    </S.EventWrapper>

  );
};

export default EventBannerContainer;
