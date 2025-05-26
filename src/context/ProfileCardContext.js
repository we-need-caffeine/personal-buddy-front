import { createContext, useState } from 'react';

export const ProfileCardContext = createContext();

export const ProfileCardProvider = ({ children }) => {
  // 프로필 카드 정보를 담는 변수
  const [profileCardInfo, setProfileCardInfo] = useState({});

  //------------------------ [ 프로필 카드 함수 ]
  //------------------------ [ 프로필 카드 상태 ]
  // const [showProfileCard, setShowProfileCard] = useState(false);

  //------------------------ [ 프로필카드 드롭다운의 위치 ]
  // const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

  //------------------------ [ 마이페이지용 프로필 카드를 열고 닫는 함수 ]
  // const handleProfileCard = (state) => {
  //     setShowProfileCard(state)
  // }

  //------------------------ [ 클릭할 프로필에 넣는 이벤트 ]
  // onClick={(e) => {
  //   setDropdownPos({ x: e.clientX, y: e.clientY });
  //   handleProfileCard(true)
  // }}

  //------------------------ [ 프로필 카드 영역 ]
  // {showProfileCard && (
  //   <S.ProfileCardDropdown
  //     style={{ top: dropdownPos.y, left: dropdownPos.x }}
  //   >
  //     <ProfileCard
  //       memberId={myId} // 로그인된 유저의 아이디
  //       profileCardMemberId={cardId} // 정보를 볼 유저의 아이디
  //       handleProfileCard={showProfileCard}
  //       onCancel={() => handleProfileCard(false)}
  //     />
  //   </S.ProfileCardDropdown>
  // )}
  // { showProfileCard && (
  //   <S.CardBG 
  //     onClick={() => {
  //       handleProfileCard(false)
  //       setDropdownPos({ x: 0, y: 0 });
  //     }}
  //   />
  // )}

  //----------------------------------------------[style.js]
  //------------------------ [ 드롭다운 스타일 ]
  // S.ProfileCardDropdown = styled.div`
  //   position: fixed;
  //   z-index: 11000;
  // `;

  //------------------------ [ 카드 백그라운드 스타일 ]
  // S.CardBG = styled.div`
  //   position: fixed;
  //   left: 0;
  //   top : 0;
  //   width: 100vw;
  //   height: 100vh;
  //   z-index: 10000;
  // `

  // 프로필 정보를 가져오는 함수
  const getProfile = async (memberId, profileCardMemberId) => {
    if (!memberId || !profileCardMemberId) return;
    const response = await fetch(`http://localhost:10000/follows/api/profile-card?memberId=${memberId}&profileCardMemberId=${profileCardMemberId}`)
    const datas = await response.json()
    setProfileCardInfo(datas)
  };

  // 팔로우 / 언팔로우 값을 받고 해당하는 함수를 실행
  const handleFollow = async (memberId, profileCardMemberId) => {
    if (profileCardInfo.isFollow === 1) {
      unfollow(memberId, profileCardMemberId)
    } else {
      follow(memberId, profileCardMemberId)
    }
  }

  // 팔로우
  const follow = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/follow/${profileCardMemberId}?followingMemberId=${memberId}`, {
        method: "POST"
    })
    if (response.ok) {
        alert("팔로우 성공")
        getProfile(memberId, profileCardMemberId);
    }
  };
  
  //언팔로우
  const unfollow = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/follow/delete?followerMemberId=${profileCardMemberId}&followingMemberId=${memberId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        alert("팔로우 취소")
        getProfile(memberId, profileCardMemberId);
    }
  };

  // 즐겨찾기 토글
  const toggleFavorite = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/favorite/toggle`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        followerMemberId: profileCardInfo.id,
        followingMemberId: memberId,
        followFavorite: profileCardInfo.favorite
      })
    })
    if(response.ok) {
      getProfile(memberId, profileCardMemberId);
    }
  }

  return (
    <ProfileCardContext.Provider value={{ 
      getProfile,
      profileCardInfo, 
      follow, unfollow, toggleFavorite, handleFollow, 
    }}>
      {children}
    </ProfileCardContext.Provider>
  );
};
