import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from '../alert/Alert'; // 경로에 맞게 수정해줘!
import S from './style';
import ProfileCard from '../profile/ProfileCard';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../../modules/member';

const Header = () => {
  // 로그인된 유저정보
    const {currentUser, isLogin} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 헤더 이벤트 상태
  const [showHeader, setShowHeader] = useState(true);
  // 알림창 상태
  const [showAlertModal, setShowAlertModal] = useState(false);
  // 알림 정보
  const [alertInfo, setAlertInfo] = useState([]);
  // 알림 타입 정보
  const [alertType, setAlertType] = useState("");
  // const alertRef = useRef();
  // 프로필 카드 상태
  const [profileCardInfo, setProfileCardInfo] = useState([]);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileImgRef = useRef();

  const dispatch = useDispatch();

  const handleProfileCard = (state) => {
    setShowProfileCard(state)
  }

  // 알림을 조회하는 함수
  const getAlerts = async() => {
    let url = "";
    if (alertType === null || alertType === "") {
      url = `http://localhost:10000/alerts/api/alert/list/${memberId}`
    } else {
      url = `http://localhost:10000/alerts/api/alert/list/${memberId}?alertType=${alertType}`
    }
    const response = await fetch(url);
    const alerts = await response.json();
    setAlertInfo(alerts.data);
  };

  // 알림을 단일 삭제하는 함수
  const handleDelete = async(id) => {
    await fetch(`http://localhost:10000/alerts/api/alert/delete/${id}`, {
      method : "DELETE",
    })
    .then((res) => {
      if (res.ok) {
        alert("알림 삭제 성공!")
        getAlerts();
      } else {
        alert("알림 삭제를 실패하였습니다.")
      }
    })
    .catch(console.error)
  };

  // 알림을 전체 삭제하는 함수
  const handleDeleteAll = async() => {
    await fetch(`http://localhost:10000/alerts/api/alert/delete-all/${memberId}`, {
      method : "DELETE",
    })
    .then((res) => {
      if (res.ok) {
        alert("알림 삭제 성공!")
        getAlerts();
      } else {
        alert("알림 삭제를 실패하였습니다.")
      }
    })
    .catch(console.error)
  };

  // 알림을 닫는 함수
  const handleCancel = () => {
    setShowAlertModal(null);
  }
  
  // 헤더의 업 다운 이벤트
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        setShowHeader(false);
      } else if (e.deltaY < 0) {
        setShowHeader(true);
      };
    };
    window.addEventListener("wheel", handleWheel);
  }, []);

  // 알림을 최초 조회하는 함수
  useEffect(() => {
    getAlerts();
  }, [alertType, memberId]);


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

        {!isLogin ? (
          <S.ProfileBox>
            <NavLink to={"/member/login"}>
              <span>로그인</span>
            </NavLink>
          </S.ProfileBox>
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
            {/* 멤버 프로필 카드 */}
            <S.ProfileBox ref={profileImgRef}>
              <S.MemberProfile
                src={currentUser.memberImgPath || "/assets/images/header/default-member-img.png"}
                onClick={() => {handleProfileCard(true)}}
              />
              <span onClick={handleLogout}>로그아웃</span>

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
            alertInfo={alertInfo}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            onChangeType={setAlertType}
          />
        </S.AlertModalContainer>
      )}

    </S.Container>
  );
};

export default Header;
