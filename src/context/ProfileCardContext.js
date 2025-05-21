import { createContext, useState } from 'react';

export const ProfileCardContext = createContext();

export const ProfileCardProvider = ({ children }) => {
  // 프로필 상태값
  const [profileCardInfo, setProfileCardInfo] = useState({});
  // 팔로우
  const follow = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/follow/${profileCardMemberId}?followingMemberId=${memberId}`, {
        method: "POST"
    })
    
    if (response.ok) {
        alert("팔로우 성공")
        getProfile()
    } else {
    }
  };
  // 언팔로우
  const unfollow = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/follow/delete?followerMemberId=${profileCardMemberId}&followingMemberId=${memberId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        alert("팔로우 취소")
        getProfile()
    } else {
    }
  };
  // 프로필 정보를 가져오는 함수
  const getProfile = async (memberId, profileCardMemberId) => {
    const response = await fetch(`http://localhost:10000/follows/api/profile-card?memberId=${memberId}&profileCardMemberId=${profileCardMemberId}`)
    const datas = await response.json()
    setProfileCardInfo(datas)
  };

  return (
    <ProfileCardContext.Provider value={{ profileCardInfo, follow, unfollow, getProfile }}>
      {children}
    </ProfileCardContext.Provider>
  );
};
