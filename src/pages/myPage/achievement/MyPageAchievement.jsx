import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';

const MyPageAchievement = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const memberId = id;

  const [achievementList, setAchievementList] = useState([]);

  useEffect(() => {
    if(!memberId) return;
    const getMemberAchievementList = async () => {
      const response = await fetch(`http://localhost:10000/achievements/api/achievement/completed/${memberId}`)
      const datas = await response.json();
      setAchievementList(datas)
    }
    getMemberAchievementList();
  },[memberId])

  const achievementLists = [
  {
    id: 1,
    title: '첫 도전 완료',
    point: 100,
    image: '/assets/images/achievement/ach1.png',
  },
  {
    id: 2,
    title: '10일 연속 로그인',
    point: 200,
    image: '/assets/images/achievement/ach2.png',
  },
  {
    id: 3,
    title: '친구 초대 성공',
    point: 150,
    image: '/assets/images/achievement/ach3.png',
  },
  {
    id: 4,
    title: '프로필 완성',
    point: 120,
    image: '/assets/images/achievement/ach4.png',
  },
  {
    id: 5,
    title: '게시글 10개 작성',
    point: 180,
    image: '/assets/images/achievement/ach5.png',
  },
  {
    id: 6,
    title: '댓글 50개 작성',
    point: 160,
    image: '/assets/images/achievement/ach6.png',
  },
  {
    id: 7,
    title: '좋아요 100개 받기',
    point: 220,
    image: '/assets/images/achievement/ach7.png',
  },
  {
    id: 8,
    title: '친구 10명 달성',
    point: 140,
    image: '/assets/images/achievement/ach8.png',
  },
  {
    id: 9,
    title: '이벤트 참여',
    point: 90,
    image: '/assets/images/achievement/ach9.png',
  },
];

  return (
    <>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>도전과제를 달성하고 나만의 업적을 쌓아보세요.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>나의 대표 업적</span>
              <S.SaveAchievementMainBtn>
                등록
              </S.SaveAchievementMainBtn>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        {/* 등록한 대표 업적이 없을 때 */}
        <S.AchievementMainContainer>
          <S.BuddyLogoImg src='/assets/images/logo/buddy-logo.png' alt='퍼스널 버디 로고 이미지'/>
          <S.NotFoundAchievementText>
            “대표 업적을 등록해주세요!<br />
            등록된 대표 업적은 프로필 카드에 반영됩니다.”
          </S.NotFoundAchievementText>
        </S.AchievementMainContainer>
        {/* 하단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleBottomContainer>
              <span>나의 달성한 업적</span>
            <S.TitleTopLinkText>
              <NavLink to="">
                <span>나의 업적 보러 가기 &gt;&gt;</span>
              </NavLink>
            </S.TitleTopLinkText>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        {/* 달성한 업적이 없을 때 보여지는 부분 */}
        {/* <S.AchievementMainContainer>
          <S.BuddyLogoImg src='/assets/images/logo/buddy-logo.png' alt='퍼스널 버디 로고 이미지'/>
          <S.NotFoundAchievementText>
            “업적이 비어 있어요. 도전을 시작해보세요!”
          </S.NotFoundAchievementText>
          </S.AchievementMainContainer> */}

        {/* 업적 리스트 */}
        <S.AchievementListBox>
          {achievementList.map((item, i) => (
            <>
              <S.AchievementCard key={i}>
                1
              </S.AchievementCard>
              <S.AchievementIcon 
                src={`http://localhost:10000/files/api/display?filePath=${achievementList.achievementImgPath}&fileName=${encodeURIComponent(achievementList.achievementImgName)}`}
              />
            </>
          ))}
        </S.AchievementListBox>
      </S.MainContainer>
    </>
  );
};

export default MyPageAchievement;