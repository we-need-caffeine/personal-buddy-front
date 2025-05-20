import { createContext, useState } from 'react';

export const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followings, setFollowings] = useState([]); // 팔로우한 멤버 ID 배열 등

  // 팔로우 추가
  const follow = (memberId) => setFollowings(prev => [...prev, memberId]);
  // 언팔로우
  const unfollow = (memberId) => setFollowings(prev => prev.filter(id => id !== memberId));

  // fetch, API, 동기화 등 복잡하게 하고 싶으면 여기에!

  return (
    <FollowContext.Provider value={{ followings, follow, unfollow }}>
      {children}
    </FollowContext.Provider>
  );
};
