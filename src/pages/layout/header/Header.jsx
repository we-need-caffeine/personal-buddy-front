  import React, { useContext, useEffect, useState } from 'react';
  import { NavLink } from 'react-router-dom';
  import Alert from '../alert/Alert';
  import S from './style';
  import ProfileCard from '../profile/ProfileCard';
  import { useDispatch, useSelector } from 'react-redux';
  import { setUser, setUserStatus } from '../../../modules/member';
  import { HeaderContext } from '../../../context/HeaderContext';
  import ChatRoom from '../chatting/ChatRoom';
  import { ChatContext } from '../../../context/ChatContext';

  const Header = () => {
    // 로그인된 유저정보
    const {currentUser, isLogin} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;
    // 헤더 이벤트 상태
    const [showHeader, setShowHeader] = useState(true);
    // transition 강제 제거 여부
    const [noTransition, setNoTransition] = useState(false);
    // 헤더 이벤트 콘텍스트
    const { headerScroll } = useContext(HeaderContext);
    // 프로필 카드 상태
    const [showProfileCard, setShowProfileCard] = useState(false);
    // 프로필카드 드롭다운 위치
    const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
    // 알림창 상태
    const [showAlertModal, setShowAlertModal] = useState(false);
    // 읽지 않은 알림 수
    const [notReadAlertCount, setNotReadAlertCount] = useState(0);
    // 채팅 콘텍스트
    const { 
      connect, 
      disconnect,
      showChat,
      showChatRoom, 
      handleChatRoom, 
      chatRoomList,
      getNotReadChatting,
      chatNotReadCount,
      isNewMessage
    } = useContext(ChatContext);
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

    // 채팅룸의 알림을 조회하는 함수
    useEffect(() => {
      getNotReadChatting(memberId)
      console.log(chatNotReadCount);
      
    }, [memberId, isNewMessage, showChat])

    // 채팅룸이 켜질 때 헤더 스크롤 밀림 방지
    useEffect(() => {
      if (showChatRoom) {
        setNoTransition(true);
        setShowHeader(true);
        setTimeout(() => setNoTransition(false), 30);
      }
    }, [showChatRoom]);

    // 웹소켓 연결
    useEffect(() => {
      if (chatRoomList.length > 0) {
        connect(chatRoomList);
        return () => disconnect();
      }
    }, [chatRoomList]);
    
    // 읽지않은 알림의 수를 조회
    useEffect(() => {
      const getNotReadAlertCount = async () => {
        const response = await fetch(`http://localhost:10000/alerts/api/alert/count/${memberId}`)
        const data = await response.json()
        setNotReadAlertCount(data)
      }
      getNotReadAlertCount()
    }, [memberId])

    // 알림 버튼 클릭시, 알림을 읽음처리
    const readAlerts = async() => {
      await fetch(`http://localhost:10000/alerts/api/alert/read/${memberId}`, {
          method: "PUT"
      })
      .then((res) => {
          if (res.ok) {
          } else {
          }
      })
      .catch(console.error)
    }
    
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
      <S.Container 
        $showHeader={showHeader} 
        $noTransition={noTransition}
      >
        <S.Main>
          <S.Left>
            {/* 네비게이션 영역 */}
            <NavLink to="/main">
              <S.IconBox>
                <img src="/assets/images/header/persenalBuddyIcon.png" alt="퍼스널 버디 아이콘" />
              </S.IconBox>
            </NavLink>

            <S.LinkBox>
              <NavLink to="/main" end>일정관리</NavLink>
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
                <S.ChatIconContainer>
                  <S.ChatImg 
                    src="/assets/images/header/message.png" 
                    alt="메세지 아이콘" 
                    onClick={() => {
                      handleChatRoom(true)
                    }}
                  />
                  {chatNotReadCount > 0 && (
                    <S.NotReadChatCount>
                      {chatNotReadCount > 99 ? "99+" : chatNotReadCount}
                    </S.NotReadChatCount>
                  )}
                </S.ChatIconContainer>
                <S.AlertIconContainer>
                  <S.AlertImg
                    src="/assets/images/header/alert.png"
                    alt="알림 아이콘"
                    onClick={(e) => {
                      handleAlertModal(true)
                      readAlerts()
                    }}
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
                  src={`http://localhost:10000/images/profile/${currentUser.memberImgName}`}
                  onClick={(e) => {
                    setDropdownPos({ x: e.clientX, y: e.clientY });
                    handleProfileCard(true)
                  }}
                  onError={e => {
                    e.target.src = "/assets/images/header/default-member-img.png";
                  }}
                />
                {/* 로그아웃 */}
                <span onClick={handleLogout}>로그아웃</span>
                {/* 프로필 카드 영역 */}
                {showProfileCard && (
                  <S.ProfileCardDropdown
                    style={{ top: dropdownPos.y, left: dropdownPos.x - 350 }}
                  >
                    <ProfileCard
                      memberId={memberId}
                      profileCardMemberId={memberId}
                      handleProfileCard={showProfileCard}
                      onCancel={() => handleProfileCard(false)}
                    />
                  </S.ProfileCardDropdown>
                )}
                { showProfileCard && (
                  <S.CardBG 
                    onClick={() => {
                      handleProfileCard(false)
                      setDropdownPos({ x: 0, y: 0 });
                    }}
                  />
                )}
              </S.ProfileBox>
            </S.Right>
          )}
        </S.Main>

        {/* 채팅방 */}
        {showChatRoom && (
          <ChatRoom
            memberId={memberId}
            handleChatRoom={showChatRoom}
            onCancel={() => {
              handleChatRoom(false)
            }}
          />
        )}

        {/* 알림창 */}
        {showAlertModal && (
          <Alert
            memberId={memberId}
            handleAlertModal={showAlertModal}
            onCancel={() => {
              handleAlertModal(false)
            }}
          />
        )}
      </S.Container>
    );
  };

  export default Header;
