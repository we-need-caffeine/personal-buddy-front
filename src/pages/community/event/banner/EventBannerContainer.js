import React from 'react';
import S from './style';

const EventBannerContainer = () => {
  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>

      <S.EventBannerBox>
        <S.BannerCard /> 
        <S.BannerCard />
        <S.BannerCard />
      </S.EventBannerBox>
    </S.EventWrapper>
  );
};

export default EventBannerContainer;
