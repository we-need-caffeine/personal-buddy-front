import { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider  = ({ children }) => {
  // 헤더 스크롤 이벤트 상태값
  const [headerScroll, setHeaderScroll] = useState(true);
  // 헤더 채팅룸 활성화
  const [showChatRoom, setShowChatRoom] = useState(false);
  // 헤더 채팅 활성화
  const [showChat, setShowChat] = useState(false);

  // 채팅룸의 상태를 바꿔주는 함수
  const handleChatRoom = (state) => {
    setShowChatRoom(state)
  }

  // 채팅의 상태를 바꿔주는 함수
  const handleChat = (state) => {
    setShowChat(state)
  }

  return (
    <HeaderContext.Provider value={{ 
      headerScroll, 
      setHeaderScroll, 
      showChatRoom, 
      handleChatRoom, 
      showChat,
      handleChat
    }}>
      {children}
    </HeaderContext.Provider>
  );
};
