import React, { useEffect, useState } from 'react';
import S from './style';

const EventBannerContainer = ( {play} ) => {
  
  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>    
      
      <img src=''>이미지1</img>
      <img src=''>이미지2</img>
      <img src=''>이미지3</img>

    </S.EventWrapper>
  );
};

export default EventBannerContainer;