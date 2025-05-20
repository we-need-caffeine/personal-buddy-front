import React, { useEffect, useState } from 'react';
import S from './style';

const EventBannerContainer = ( {play} ) => {
  const [eventPosts, setEventPosts] = useState(); // Event 게시글 리스트 상태

  const eventSlider = useEffect(()=>{
    if(play?.length) {
      setEventPosts(play);
    }
  }, [play])

  return (
    <S.EventWrapper>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>진행중인 이벤트</S.MainTitle>    
      
      <img src=''></img>
      <img src=''></img>
      <img src=''></img>

      

    </S.EventWrapper>
  );
};

export default EventBannerContainer;