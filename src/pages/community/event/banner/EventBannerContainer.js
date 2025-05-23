import React, { useEffect, useState } from 'react';
import S from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, EffectCoverflow} from 'swiper/modules';


const EventBannerContainer = () => {
  const [banners, setBanners] = useState([]);

   const [isReady, setIsReady] = useState(false);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/current`)
    .then(res => res.json())
    .then(data => {
      console.log('배너 데이터 확인', data);
      setBanners(data);
    });
  }, []);

   // 렌더 딜레이
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const objectPositions = ['50% 0%', '50% 1%', '50% 9.5%'];



  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>

      <S.BannerSliderWrapper>

        <Swiper
          key={banners.length}
          modules={[Autoplay, EffectCoverflow]} 
          effect="coverflow" 
          coverflowEffect={{                   
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          loopedSlides={banners.length}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={10}
          grabCursor={true}
          initialSlide={1}
          observer={true}
          observeParents={true}
          style={{ width: '100%', height: '100%' }}
          // onSwiper={(swiper) => { setTimeout(() => swiper.autoplay.start(), 100) }}
          watchSlidesProgress={true}      
          watchSlidesVisibility={true} 
        >

          {banners.map((event, i) => {
            const filePath = event.eventImgPath; 
            const fileName = event.eventImgName; 
            
            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${(filePath)}&fileName=${encodeURIComponent(fileName)}`;
            console.log("이미지 경로", imageUrl);

            return (
              <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }} key={i}>
                <S.BannerCard objectPosition={objectPositions[i]}>
                  <img src={encodeURI(imageUrl)} 
                  alt="이벤트 배너"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: objectPositions[i] || 'center'
                  }}
                  />
                </S.BannerCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </S.BannerSliderWrapper>
    </S.EventWrapper>

  );
};

export default EventBannerContainer;
