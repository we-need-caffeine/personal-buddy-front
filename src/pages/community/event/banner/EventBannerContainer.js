import React, { useEffect, useState } from 'react';
import S from './style';
import SwiperCore from "swiper/core";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import { Link, useNavigate } from 'react-router-dom';
SwiperCore.use([Autoplay]);

const EventBannerContainer = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

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
      <S.MainTitle>진행중인 이벤트 🎉</S.MainTitle>

      <S.BannerSliderWrapper>
        <Swiper
          spaceBetween={-323}
          modules={[EffectCoverflow, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={'coverflow'}
          centeredSlides={false}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: -150,
            depth: 250,
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
            const getEventType = (title) => {
            if (title.includes('기상') || title.includes('wake')) return 'wake-up';
            if (title.includes('루틴') || title.includes('routine')) return 'routine';
            if (title.includes('힐링') || title.includes('healing')) return 'healing-day';
            return 'routine'; 
          };
          const eventType = getEventType(event.eventTitle);
            return (
            <SwiperSlide key={i}>
              {/* <Link to={`/main/community/event/post/${event.id}/${eventType}`}> */}
                 <S.BannerCard
                  onClick={() => {
                    const eventType = getEventType(event.eventTitle);

                    if (eventType === 'healing-day') {
                      alert('진행중인 이벤트가 아닙니다');
                      navigate('/main/community/event');
                      return;
                    }
                    navigate(`/main/community/event/post/${event.id}/${eventType}`);

                  }}
                >
                  <img src={encodeURI(imageUrl)} alt="이벤트 배너" />
                </S.BannerCard>
              {/* </Link> */}
            </SwiperSlide>
          )})}
        </Swiper>
      </S.BannerSliderWrapper>
    </S.EventWrapper>
  );
};

export default EventBannerContainer;
