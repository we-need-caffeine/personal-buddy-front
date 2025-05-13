import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style'; 

const Header = () => {
  // 로그인 여부
  const isLogin = 1;

  // 헤더 상태
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // 마우스 휠 이벤트로 헤더 보임/숨김 처리
    const handleWheel = (e) => {
      if (e.deltaY > 0) setShowHeader(false); // 아래로 스크롤하면 숨김 
      else if (e.deltaY < 0) setShowHeader(true); // 위로 스크롤하면 보임
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel); 
    // delta : window wheel event 속성
    // Y : 방향 설정
    // deltaY : 휠 스크롤 시 Y축 방향으로 얼마나 움직였는지
  }, []);

  return (
    // 전체 헤더 컨테이너 (스크롤 방향에 따라 transform 적용)
    <S.Container style={{ transform: showHeader ? 'translateY(0)' : 'translateY(-100%)' }}>
      {/* 가운데 정렬된 내부 레이아웃 */}
      <S.Main>
        {/* 왼쪽: 로고 + 메뉴 링크 */}
        <S.Left>
          <S.IconBox>
            <img src="/assets/images/header/persenalBuddyIcon.png" alt="퍼스널 버디 아이콘" />
          </S.IconBox>

          <S.LinkBox>
            <NavLink to="/main">일정관리</NavLink>
            <NavLink to="/main/contents">컨텐츠</NavLink>
            <NavLink to="/main/community/event">이벤트</NavLink>
            <NavLink to="/main/community/board">커뮤니티</NavLink>
            <NavLink to="/main/faq">고객센터</NavLink>
          </S.LinkBox>
        </S.Left>

        {/* 오른쪽: 로그인 상태에 따라 다르게 렌더링 */}
        {isLogin == null ? (
          // 로그인 안 했을 때: 로그인 버튼
          <S.ProfileBox>
            <span>로그인</span>
          </S.ProfileBox>
        ) : (
          // 로그인 했을 때: 메시지 + 알림 + 프로필 + 로그아웃
          <S.Right>
            <S.SocialBox>
              <img src="/assets/images/header/message.png" alt="메세지 아이콘" />
              <img src="/assets/images/header/alert.png" alt="알림 아이콘" />
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
    </S.Container>
  );
};

export default Header;







// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { headerContainer, headerLeftContainer, headerLinkContainer, headerMainContainer, headerMainIconContainer, headerProfileContainer, headerRightContainer, headerSocialContainer } from './style';


// const Header = () => {

//     // 로그인 여부
//     const isLogin = 1;

//     // 헤더 상태
//     const [showHeader, setShowHeader] = useState(true);

//     useEffect(() => {
//         const handleWheel = (e) => {
//             if (e.deltaY > 0) {
//                 setShowHeader(false);
//             } else if (e.deltaY < 0) {
//                 setShowHeader(true);
//             }
//         };
//         window.addEventListener("wheel", handleWheel);
//     }, []);

//     return (
//         <div style={{
//             ...headerContainer,
//             transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
//         }}>
//             <div style={{
//                 ...headerMainContainer,
//             }}>
//                 <div style={headerLeftContainer}>
//                     <div style={headerMainIconContainer}>
//                         <img style={{cursor: "pointer",}} src='/assets/images/header/persenalBuddyIcon.png' alt="퍼스널 버디 아이콘" />
//                     </div>
//                     <div style={headerLinkContainer}>
//                         <NavLink to={"/main"}>일정관리</NavLink>
//                         <NavLink to={"/main/contents"}>컨텐츠</NavLink>
//                         <NavLink to={"/main/community/event"}>이벤트</NavLink>
//                         <NavLink to={"/main/community/board"}>커뮤니티</NavLink>
//                         <NavLink to={"/main/faq"}>고객센터</NavLink>
//                     </div>
//                 </div>
//                 {isLogin == null ? (
//                     <div style={headerProfileContainer}>
//                         <span>로그인</span>
//                     </div>
//                 ) : (
//                     <div style={headerRightContainer}>
//                         <div style={headerSocialContainer}>
//                             <img style={{cursor: "pointer"}} src='/assets/images/header/message.png' alt="메세지 아이콘" />
//                             <img style={{cursor: "pointer"}} src='/assets/images/header/alert.png' alt="알림 아이콘" />
//                         </div>
//                         <div style={headerProfileContainer}>
//                             <NavLink to={"/main/mypage"}>
//                                 <img style={{marginRight: '25px',cursor: "pointer", width:'40px', height:'40px', borderRadius:'36px'}} src='/assets/images/header/memberProfile.png' alt="멤버 프로필" />
//                             </NavLink>
//                             <span style={{cursor: "pointer"}}>로그아웃</span>
//                         </div>
//                     </div>
//                 )}  
//             </div>
//         </div>
//     );
// };

// export default Header;