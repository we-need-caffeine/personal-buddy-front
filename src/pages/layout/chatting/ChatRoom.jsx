import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';
import { ChatContext } from '../../../context/ChatContext';
import ChatRoomItem from './ChatRoomItem';

const ChatRoom = ({ memberId, handleChatRoom, onCancel}) => {

  // 채팅 콘텍스트
  const { chatRoomList, getChatRoomList, handleTextareaChange, setFollowFilter, inputText, followFilter, setChatRoomId, handleChat } = useContext(ChatContext)
  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  //최초로 채팅의 리스트를 가져오는 함수
  useEffect(() => {
    getChatRoomList(memberId);
  }, [memberId, inputText, followFilter]);

  useEffect(() => {
      if (handleChatRoom) lockScroll();
      return () => unlockScroll();
  }, [handleChatRoom]);

  return (
    <S.Backdrop onClick={onCancel}>
      <S.ChatRoomContainer onClick={e => e.stopPropagation()}>
        {/* 메세지 타이틀 / 닫기 버튼 */}
        <S.TitleContainer>
          <S.Title>메세지</S.Title>
          <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel}/>
        </S.TitleContainer>
        <S.TopContainer>
          <S.SearchBox>
            <S.SearchIcon
              src='/assets/images/follow/search-icon.png'
              alt='돋보기 아이콘'
            />
            <S.SearchInput
              maxLength={14} 
              placeholder='닉네임 검색'
              onChange={handleTextareaChange}
              value={inputText}
              spellCheck={false}
              onDrop={e => e.preventDefault()}
              onDragOver={e => e.preventDefault()}
            >
            </S.SearchInput>
          </S.SearchBox>
          <S.SelectBox onChange={(e) => setFollowFilter(e.target.value)}>
            <option value="">전체</option>
            <option value="follow">팔로잉</option>
            <option value="favorite">즐겨찾기</option>
          </S.SelectBox>
        </S.TopContainer>
        <S.ListContainer>
          {chatRoomList.map((item, i) => (
            <ChatRoomItem 
              key={i}
              item={item}
              memberId={memberId}
              handleChat={() => handleChat(true)}
              setChatRoomId={setChatRoomId}
              onCancel={onCancel}
            />
          ))}
        </S.ListContainer>
      </S.ChatRoomContainer>
    </S.Backdrop>
  );
};

export default ChatRoom;