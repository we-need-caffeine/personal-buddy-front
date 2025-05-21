import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from '../alert/Alert'; // 경로에 맞게 수정해줘!
import S from './style';
import ProfileCard from '../profile/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../../modules/member';
import { HeaderContext } from '../../../context/HeaderContext';

const Header = () => {
  // 로그인된 유저정보
  const {currentUser, isLogin} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 헤더 이벤트 상태
  const [showHeader, setShowHeader] = useState(true);
  // 헤더 이벤트 콘텍스트
  const { headerScroll } = useContext(HeaderContext);
  // 알림창 상태
  const [showAlertModal, setShowAlertModal] = useState(false);
  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 읽지 않은 알림 수
  const [notReadAlertCount, setNotReadAlertCount] = useState(0);
  // 리덕스 사용
  const dispatch = useDispatch();

  // 프로필 카드를 열고 닫는 함수
  const handleProfileCard = (state) => {
    setShowProfileCard(state)
  }

  // 알림을 열고 닫는 함수
  const handleAlertModal = (state) => {
    setShowAlertModal(state);
  }
  
  // 읽지않은 알림을 최초로 실행시키기
  useEffect(() => {
    // 읽지 않은 알림을 조회하는 함수
    const getNotReadAlertCount = async () => {
      const response = await fetch(`http://localhost:10000/alerts/api/alert/count/${memberId}`)
      const data = await response.json()
      setNotReadAlertCount(data)
    }
    getNotReadAlertCount()
  }, [memberId])
  
  // 헤더의 업 다운 이벤트
  useEffect(() => {
    if (headerScroll) {
      const handleWheel = (e) => {
        if (e.deltaY > 0) {
          setShowHeader(false);
        } else if (e.deltaY < 0) {
          setShowHeader(true);
        };
      };
      // 휠 이벤트 감지 후 함수 등록
      window.addEventListener("wheel", handleWheel);
      
      return() => {
        window.removeEventListener("wheel", handleWheel);
      }
    }
  }, [headerScroll]);

  // 로그아웃 : 로컬스토리지의 토큰정보를 지우고, 리덕스에 있는 멤버정보를 비운다.
  const handleLogout = () => {
    localStorage.clear()
    dispatch(setUser({
      id : 0,
      memberEmail : "",
      memberPassword : "",
      memberName : "",
      memberBirth : "",
      memberGender : "",
      memberPhone : "",
      memberNickName : "",
      memberStatusMessage : "",
      memberImgName : "",
      memberImgPath : "",
      memberPoint : 0,
      memberAdmin : 0,
      memberCreateDate : "",
      memberTermServiceAgree : 0,
      memberTermInformationAgree : 0,
      memberTermLocationAgree : 0,
      memberTermPromotionAgree : 0,
      memberProvider : "",
    }))
    dispatch(setUserStatus(false))
    // window.location.href = "http://localhost:10000/logout";
  }

  return (
    <S.Container style={{ transform: showHeader ? 'translateY(0)' : 'translateY(-110%)' }}>
      <S.Main>
        <S.Left>
          {/* 네비게이션 영역 */}
          <NavLink to={`/main/${memberId}`}>
            <S.IconBox>
              <img src="/assets/images/header/persenalBuddyIcon.png" alt="퍼스널 버디 아이콘" />
            </S.IconBox>
          </NavLink>

          <S.LinkBox>
            <NavLink to={`/main/${memberId}`} end>일정관리</NavLink>
            <NavLink to="/main/contents">컨텐츠</NavLink>
            <NavLink to="/main/community/event">이벤트</NavLink>
            <NavLink to="/main/community/board">커뮤니티</NavLink>
            <NavLink to="/main/faq" >고객센터</NavLink>
          </S.LinkBox>
        </S.Left>
        {/* 비 로그인시 보이는 영역 */}
        {!isLogin ? (
          <S.ProfileBox>
            <NavLink to={"/member/login"}>
              <span>로그인</span>
            </NavLink>
          </S.ProfileBox>
        ) : (
          <S.Right>
            {/* 로그인시 보이는 영역 */}
            {/* 소셜 영역 */}
            <S.SocialBox>
              <img 
                src="/assets/images/header/message.png" 
                alt="메세지 아이콘" 
              />
              <S.AlertIconContainer>
                <S.AlertImg
                  src="/assets/images/header/alert.png"
                  alt="알림 아이콘"
                  onClick={() => {handleAlertModal(true)}}
                />
                {notReadAlertCount > 0 && (
                  <S.NotReadAlertCount>
                    {notReadAlertCount > 99 ? "99+" : notReadAlertCount}
                  </S.NotReadAlertCount>
                )}
              </S.AlertIconContainer>
            </S.SocialBox>
            {/* 프로필 영역 */}
            <S.ProfileBox>
              <S.MemberProfile
                src={currentUser.memberImgPath || "/assets/images/header/default-member-img.png"}
                onClick={() => {handleProfileCard(true)}}
                onError={e => {
                  e.target.src = "/assets/images/header/default-member-img.png";
                }}
              />
              {/* 로그아웃 */}
              <span onClick={handleLogout}>로그아웃</span>
              {/* 프로필 카드 영역 */}
              {showProfileCard && (
                <S.ProfileCardDropdown>
                  <ProfileCard
                    memberId={memberId}
                    profileCardMemberId={memberId}
                    handleProfileCard={handleProfileCard}
                  />
                </S.ProfileCardDropdown>
              )}
              { showProfileCard && (
                <S.CardBG 
                  onClick={() => {handleProfileCard(false)}}
                />
              )}
            </S.ProfileBox>
          </S.Right>
        )}
      </S.Main>

      {/* 알림창 */}
      {showAlertModal && (
        <S.AlertModalContainer>
          <Alert
            memberId={memberId}
            handleAlertModal={handleAlertModal}
          />
        </S.AlertModalContainer>
      )}
      {showAlertModal && (
        <S.CardBG 
          onClick={() => {handleAlertModal(false)}}
        />
      )}
    </S.Container>
  );
};

export default Header;
