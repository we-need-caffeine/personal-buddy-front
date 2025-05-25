// EventPostListContainer.js
import React, { useEffect, useState } from 'react';
import S from './style';
import FormatDate from '../../../../utils/formatDate/FormatDate';

const EventPostListContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/available`)
      .then(res => res.json())
      .then(data => {
        console.log('이벤트 데이터 확인', data);
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('이벤트 불러오기 실패:', err));
  }, []);

  return (
    <S.PostSection>
      <div>
        <S.SubTitle>BUDDYGROUND</S.SubTitle>
        <S.MainTitle>버디들의 챌린지</S.MainTitle>
      </div>

      <S.PostListWrapper>
        {events.map((event) => {
          const isComingSoon = new Date(event.eventStartDate) > new Date();
          const isEnded = new Date(event.eventEndDate) < new Date();
          console.log("이미지 경로 확인:", event.eventImgPath, event.eventImgName);
          console.log(event.eventImgName)

          return (
            <div>
            <S.PostCard key={event.id}>
              <S.ImageBox>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${event.eventImgPath}&fileName=${event.eventImgName}`}
                  alt={event.eventTitle}
                />
                {isComingSoon && <S.BadgeComingSoon>COMING SOON</S.BadgeComingSoon>}
                {event.joined && !isEnded && <S.BadgeComplete>미션 컴플리트</S.BadgeComplete>}
              </S.ImageBox>
            </S.PostCard>
              <S.InfoBox>
                <div>{event.eventTitle}</div>
                <div>{FormatDate(event.eventStartDate)}</div>
              </S.InfoBox>
              </div>
          );
        })}
      </S.PostListWrapper>
    </S.PostSection>
  );
};

export default EventPostListContainer;
