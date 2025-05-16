import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from '../alert/Alert'; // 경로에 맞게 수정해줘!
import S from './style';

const Header = () => {
  // 로그인 상태
  const isLogin = 1;
  // 헤더 이벤트 상태
  const [showHeader, setShowHeader] = useState(true);
  // 알림창 상태
  const [showAlertModal, setShowAlertModal] = useState(false);
  // 알림 DOM 요소에 직접 참조하거나 조작할 수 있게 해주는 훅함수
  const alertRef = useRef();
  // 알림 더미 데이터
  const alertInfo = [
    { id: 1, nickname: '나무조하', profileImg: '/assets/images/header/memberProfile.png', message: '님이 댓글을 달았습니다.', time: '오후 9:20' },
    { id: 2, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 3, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 4, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 5, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 6, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 7, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
    { id: 8, nickname: 'Stella', profileImg: '/assets/images/header/memberProfile.png', message: '님이 좋아요를 눌렀습니다.', time: '오전 11:20' },
  ];

  // 알림을 단일 삭제하는 함수
  const handleDelete = (id) => {
    console.log('삭제:', id);
  };

  // 알림을 전체 삭제하는 함수
  const handleDeleteAll = () => {
    console.log('전체 삭제');
  };

  // 알림을 닫는 함수
  const handleCancel = () => {
    setShowAlertModal(false);
  }
  
  // 외부 클릭 시 알림창 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (alertRef.current && !alertRef.current.contains(e.target)) {
        setShowAlertModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 헤더의 업 다운 이벤트
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setShowHeader(false);
      } else if (e.deltaY < 0) {
        setShowHeader(true);
      };
    };
    // window.addEventListener("wheel", handleWheel);
    // return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  
  return (
    <S.Container style={{ transform: showHeader ? 'translateY(0)' : 'translateY(-110%)' }}>
      <S.Main>
        <S.Left>
          <S.IconBox>
            <img src="/assets/images/header/persenalBuddyIcon.png" alt="퍼스널 버디 아이콘" />
          </S.IconBox>

          <S.LinkBox>
            <NavLink to="/main" end>일정관리</NavLink>
            <NavLink to="/main/contents">컨텐츠</NavLink>
            <NavLink to="/main/community/event">이벤트</NavLink>
            <NavLink to="/main/community/board">커뮤니티</NavLink>
            <NavLink to="/main/faq" >고객센터</NavLink>
          </S.LinkBox>
        </S.Left>

        {isLogin == null ? (
          <S.ProfileBox><span>로그인</span></S.ProfileBox>
        ) : (
          <S.Right>
            <S.SocialBox>
              <img src="/assets/images/header/message.png" alt="메세지 아이콘" />
              <img
                src="/assets/images/header/alert.png"
                alt="알림 아이콘"
                onClick={() => setShowAlertModal((prev) => !prev)}
              />
            </S.SocialBox>

            <S.ProfileBox>
              <NavLink to="/main/mypage">
                <img src="/assets/images/header/memberProfile.png" alt="멤버 프로필" />
              </NavLink>
              <span>로그아웃</span>
            </S.ProfileBox>
          </S.Right>
        )}
      </S.Main>

      {/* 알림창 */}
      {showAlertModal && (
        <S.AlertModalContainer ref={alertRef}>
          <Alert
            alertInfo={alertInfo}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
          />
        </S.AlertModalContainer>
      )}
    </S.Container>
  );
};

export default Header;
