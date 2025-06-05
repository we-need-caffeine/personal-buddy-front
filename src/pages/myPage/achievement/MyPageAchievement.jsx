import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';

const MyPageAchievement = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const memberId = id;
  // 업적 리스트를 담는 변수
  const [achievementList, setAchievementList] = useState([]);
  // 대표 업적을 담는 변수
  const [achievementRep, setAchievementRep] = useState([]);
  // 대표 업적을 변경하면 토글하는 스위치
  const [isToggle, setIsToggle] = useState(false)

  // 대표 업적 선택 상태값 변경 함수
  const toggleRepStatus = (achievementId) => {
    setAchievementList(prev => {
      return prev.map(item => {
        // 현재 아이템인지 확인
        if (item.id === achievementId) {
          const isCurrentRep = item.memberAchievementDisplay === 1;
          const repCount = prev.filter(a => a.memberAchievementDisplay === 1).length;
          // 이미 대표고 -> 해제는 허용
          if (isCurrentRep) {
            return { ...item, memberAchievementDisplay: 0 };
          }
          // 대표 업적이 3개 미만이면 선택 허용
          if (repCount < 3) {
            return { ...item, memberAchievementDisplay: 1 };
          }
          alert("대표 업적은 최대 3개까지 선택할 수 있습니다.");
          return item;
        }
        return item;
      });
    });
  };

  // 업적 리스트를 불러오는 함수
  useEffect(() => {
    if(!memberId) return;
    const getMemberAchievementList = async () => {
      const response = await fetch(`http://localhost:10000/achievements/api/achievement/completed/${memberId}`)
      const datas = await response.json();
      setAchievementList(datas)
    }
    getMemberAchievementList();
  },[memberId, isToggle])

  // 대표 업적을 불러오는 함수
  useEffect(() => {
    if(!memberId) return;
    const getMemberAchievementRep = async () => {
      const response = await fetch(`http://localhost:10000/achievements/api/achievement/displayed/${memberId}`)
      const datas = await response.json();
      setAchievementRep(datas)
    }
    getMemberAchievementRep();
  },[memberId, isToggle])

  // 대표 업적을 수정하는 함수
  const updateAchivementRep = async() => {
    const response = await fetch(`http://localhost:10000/achievements/api/achievement/change-display/${memberId}`,{
      method : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(achievementList)
    })
    const datas = await response.json()
    console.log(datas);
    if (response.ok) {
      alert(`대표 업적 변경 성공`)
      setIsToggle(prev => !prev)
    }
  }

  return (
    <>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>도전과제를 달성하고 나만의 업적을 쌓아보세요.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>나의 대표 업적 🎖️</span>
              <S.SaveAchievementMainBtn onClick={() => updateAchivementRep()}>
                등록
              </S.SaveAchievementMainBtn>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        {/* 등록한 대표 업적이 없을 때 */}
        <S.AchievementMainContainer>
          {achievementRep.length === 0 ? (
            <>
              <S.BuddyLogoImg src='/assets/images/logo/buddy-logo.png' alt='퍼스널 버디 로고 이미지'/>
              <S.NotFoundAchievementText>
                “대표 업적을 등록해주세요!<br />
                등록된 대표 업적은 프로필 카드에 반영됩니다.”
              </S.NotFoundAchievementText>
            </>
          ) : (
            achievementRep.map((item, i) => (
              <S.AchievementCard key={i} $isRep={item.memberAchievementDisplay === 1}>
                <S.AchievementIcon 
                  src={`http://localhost:10000/files/api/display?filePath=${item.achievementImgPath}&fileName=${encodeURIComponent(item.achievementImgName)}`}
                  alt='업적 이미지'
                  onError={e => {
                    e.target.src = "/assets/images/header/default-achivement-img.png";
                  }}
                />
                <S.DescriptionTitle>{item.achievementName}</S.DescriptionTitle>
                <S.DescriptionListContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>{item.achievementScheduleCategory} 일정</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>{item.achievementMissionCount}회 완료 시 달성</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>({item.achievementCurrentMissionCount} / {item.achievementMissionCount})</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>
                      달성 시 <S.DescriptionGetPoint>{item.achievementGetPoint}P</S.DescriptionGetPoint> 획득
                    </S.Description>
                  </S.DescriptionContainer>
                </S.DescriptionListContainer>
              </S.AchievementCard>
            ))
          )}
        </S.AchievementMainContainer>
        {/* 하단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleBottomContainer>
              <span>나의 달성한 업적 🏆</span>
            <S.TitleTopText>
              <NavLink to="/main/contents">
                <span>나의 업적 보러 가기 &gt;&gt;</span>
              </NavLink>
            </S.TitleTopText>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        {/* 달성한 업적이 없을 때 보여지는 부분 */}
        {achievementList.length === 0 ? (
          <S.AchievementMainContainer>
            <S.BuddyLogoImg src='/assets/images/logo/buddy-logo.png' alt='퍼스널 버디 로고 이미지'/>
            <S.NotFoundAchievementText>
              “업적이 비어 있어요. 도전을 시작해보세요!”
            </S.NotFoundAchievementText>
          </S.AchievementMainContainer>
        ) : (
          <S.AchievementListBox>
            {achievementList.map((item, i) => (
              <S.AchievementCard 
                key={i} 
                $isRep={item.memberAchievementDisplay === 1}
                onClick={() => toggleRepStatus(item.id)}
              >
                <S.AchievementIcon 
                  src={`http://localhost:10000/files/api/display?filePath=${item.achievementImgPath}&fileName=${encodeURIComponent(item.achievementImgName)}`}
                  alt='업적 이미지'
                  onError={e => {
                    e.target.src = "/assets/images/header/default-achivement-img.png";
                  }}
                />
                <S.DescriptionTitle>{item.achievementName}</S.DescriptionTitle>
                <S.DescriptionListContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>{item.achievementScheduleCategory} 일정</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>{item.achievementMissionCount}회 완료 시 달성</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>({item.achievementCurrentMissionCount} / {item.achievementMissionCount})</S.Description>
                  </S.DescriptionContainer>
                  <S.DescriptionContainer>
                    <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' alt='체크 아이콘'/>
                    <S.Description>
                      달성 시 <S.DescriptionGetPoint>{item.achievementGetPoint}P</S.DescriptionGetPoint> 획득
                    </S.Description>
                  </S.DescriptionContainer>
                </S.DescriptionListContainer>
              </S.AchievementCard>
            ))}
          </S.AchievementListBox>
        )}
      </S.MainContainer>
    </>
  );
};

export default MyPageAchievement;