import { createContext, useState } from 'react';

export const ProfileCardContext = createContext();

export const ProfileCardProvider = ({ children }) => {
  const [profileCardInfo, setProfileCardInfo] = useState({});
  
  // 프로필 정보를 가져오는 함수
  const getProfile = async (memberId, profileCardMemberId) => {
    if (!memberId || !profileCardMemberId) return;
    const response = await fetch(`http://localhost:10000/follows/api/profile-card?memberId=${memberId}&profileCardMemberId=${profileCardMemberId}`)
    const datas = await response.json()
    setProfileCardInfo(datas)
  };

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
    <ProfileCardContext.Provider value={{ profileCardInfo, follow, unfollow, toggleFavorite, getProfile }}>
      {children}
    </ProfileCardContext.Provider>
  );
};
