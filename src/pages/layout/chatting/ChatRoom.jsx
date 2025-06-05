import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';
import { ChatContext } from '../../../context/ChatContext';
import ChatRoomItem from './ChatRoomItem';

const ChatRoom = ({ memberId, handleChatRoom, onCancel }) => {

  // 채팅 콘텍스트
  const { 
    handleTextareaChange, 
    setFilterSearch, 
    chatRoomList, 
    getChatRoomList, 
    isNewMessage,
    inputSearch,
    filterSearch,
    chatRoomId,
    chatOtherUserInfo,
  } = useContext(ChatContext);
  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  // 해당 유저의 채팅방 조회
  useEffect(() => {
    getChatRoomList(memberId)
    console.log(chatRoomList);
  }, [memberId, handleChatRoom, inputSearch, filterSearch, isNewMessage, chatRoomId, chatOtherUserInfo])

  // 외부 요소 스크롤을 막는 함수
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
              spellCheck={false}
              onDrop={e => e.preventDefault()}
              onDragOver={e => e.preventDefault()}
            >
            </S.SearchInput>
          </S.SearchBox>
          <S.SelectBox onChange={(e) => setFilterSearch(e.target.value)}>
            <option value="">전체</option>
            <option value="follow">팔로잉</option>
            <option value="favorite">즐겨찾기</option>
          </S.SelectBox>
        </S.TopContainer>
        <S.ListContainer>
          {chatRoomList.map((item, i) => (
            <ChatRoomItem 
              item={item}
              memberId={memberId}
              onCancel={onCancel}
            />
          ))}
        </S.ListContainer>
      </S.ChatRoomContainer>
    </S.Backdrop>
  );
};

export default ChatRoom;