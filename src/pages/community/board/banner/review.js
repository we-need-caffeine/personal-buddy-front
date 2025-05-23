// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import S from './style';

// const EventPostListContainer = () => {
// a
//   const [events, setEvents] = useState([]); // 이벤트 리스트 상태
//   const Navigate = useNavigate(); // 상세 페이지로 이동

//   const today = new Date(); // 현재 날짜

//   useEffect(()=>{
//     fetch(`${process.env.REACT_APP_BACKEND_URL}/events/api/available`) // 참여 가능한 이벤트 목록 
//       .then(res => res.json())
//       .then(data => setEvents(data)); // 받아온 데이터 상태에 저장
//   }, []);

//   const handleClick = (e) => {
//     const startDate = new Date(e.eventStartDate); // 이벤트 시작일
//     const isFuture = startDate > today; // 커밍순 여부
//     const isJoined = e.joined; // 참여 완료 여부

//     if (isFuture || isJoined) return; // 커밍순이거나 참여완료면 클릭 막기  
//     Navigate(`/main/community/event/post/${e.id}`); // 상세 페이지 이동
//   };

//   return (
//     <S.PostSection>
//       <S.SubTitle>BUDDYGROUND</S.SubTitle>
//       <S.MainTitle>버디들의 챌린지</S.MainTitle>

//       <S.PostListWrapper>
//         {events.map((event , i)=>{
//           const startDate = new Date(event.eventStartDate); // 시작일
//           const isCommingSoon = startDate > today; // 커밍순 여부
//           const isToday = startDate.toDateString() === today.toDateString(); // 오늘인지 확인
//           const isJoined = event.joined; // 참여 완료했는지

//           const fileUrl = `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${event.filePath}&fileName=${event.fileNames[0]}`;    
          
        
        
//         })}
//       </S.PostListWrapper>
//     </S.PostSection>
//   );
// };

// export default EventPostListContainer;

// //==================================

// import styled from 'styled-components';
// import { flexCenter } from '../../../../globals/common';

// const S = {};

// // 상단 배너
// S.EventWrapper = styled.div`
//     /* width: 1400px; */
//     margin: auto;
//     display: flex;
//     flex-direction: column;
// `;

// S.SubTitle = styled.div`
//     font-size: 14px;
//     font-weight: 400;
//     color: #555;
//     margin-bottom: 3px;
// `;

// S.MainTitle = styled.div`
//     font-size: 24px;
//     font-weight: bold;
//     color: black;
//     margin-top: 1px;
//     padding-bottom: 30px;
// `;

// S.BannerBox = styled.div`
//     display: flex;
//     gap: 20px;
// `;

// S.BannerCard = styled.div`
//     width: 440px;
//     height: 250px;
//     background-color: #eee;
//     border-radius: 20px;
// `;

// // 챌린지 리스트
// S.PostSection = styled.div`
//     /* width: 1400px; */
//     margin: 80px auto;
// `;

// S.PostListWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 36px 178px;
// `;



// S.StatusBadge = styled.div`
//   position: absolute;
//   top: 15px;
//   left: 15px;
//   background: rgba(0,0,0,0.7);
//   color: white;
//   padding: 6px 12px;
//   font-size: 14px;
//   border-radius: 8px;
// `;


// export default S;

