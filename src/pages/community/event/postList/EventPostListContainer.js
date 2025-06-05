// EventPostListContainer.js
import React, { useEffect, useState } from 'react';
import S from './style';
import FormatDate from '../../../../utils/formatDate/FormatDate';
import { useNavigate } from 'react-router-dom';

const EventPostListContainer = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 
  const comingSoonTitles = [
  '매일매일 출석체크',
  '집중력 업! 공부 타임 챌린지',
  '버디들과 일정 나들이',
  '오늘 하루는 힐링 데이'
  ];

  useEffect(() => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/available`)
    .then(res => res.json())
    .then(data => {
     
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => {
            const isAComingSoon =
              new Date(a.eventStartDate) > new Date() ||
              comingSoonTitles.includes(a.eventTitle);
            const isBComingSoon =
              new Date(b.eventStartDate) > new Date() ||
              comingSoonTitles.includes(b.eventTitle);
            return isAComingSoon - isBComingSoon; // false(0) - true(1) = -1 → A가 먼저
          })
        : [];

        setEvents(sorted);
      })
      .catch((err) => console.error('이벤트 불러오기 실패:', err));
  }, []);

  return (
    <>
      <div style={{ marginTop: '150px' }}>
        <S.SubTitle>BUDDYGROUND</S.SubTitle>
        <S.MainTitle>버디들의 챌린지 🎁</S.MainTitle>
      </div>
    <S.PostSection>

      <S.PostListWrapper>
        {events.map((event) => {
          const isComingSoon = new Date(event.eventStartDate) > new Date() ||
          comingSoonTitles.includes(event.eventTitle);

          const isEnded = new Date(event.eventEndDate) < new Date();
          const getEventTypeByTitle = (title) => {
            if (title.includes('기상') || title.includes('wake')) return 'wake-up';
            if (title.includes('루틴') || title.includes('routine')) return 'routine';
            if (title.includes('힐링') || title.includes('healing')) return 'healing-day';
            if (title.includes('나들이') || title.includes('picnic')) return 'picnic';
            if (title.includes('출석') || title.includes('check')) return 'check';
            if (title.includes('공부') || title.includes('study')) return 'study';
            return 'routine'; 
          };

          return (
            <div key={event.id}>
              <S.PostCard
                isComingSoon={isComingSoon}
                onClick={() => {
                  if (!isComingSoon) {
                    let typePath = event.eventType || getEventTypeByTitle(event.eventTitle);
                    navigate(`/main/community/event/post/${event.id}/${typePath}`);
                  }
                }}
                style={{ cursor: isComingSoon ? 'not-allowed' : 'pointer' }}
              >
                <S.ImageBox>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${event.eventImgPath}&fileName=${event.eventImgName}`}
                    alt={event.eventTitle}
                  />
                  {event.joined && !isEnded && <S.BadgeComplete>미션 컴플리트</S.BadgeComplete>}
                  {isComingSoon && <S.ComingSoonOverlay>COMING SOON</S.ComingSoonOverlay>}
                </S.ImageBox>
              </S.PostCard>

              <S.InfoBox>
                <div>{event.eventTitle}</div>
                <div>{FormatDate(event.eventStartDate).split(" ")[0].replaceAll(".", "-")}</div>
              </S.InfoBox>
            </div>
          );
        })}
      </S.PostListWrapper>
    </S.PostSection>
    </>
  );
};

export default EventPostListContainer;


