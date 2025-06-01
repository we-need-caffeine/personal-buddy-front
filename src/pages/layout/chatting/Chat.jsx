import { useContext, useEffect, useRef, useState } from 'react';
import S from './style';
import { ChatContext } from '../../../context/ChatContext';
import { HeaderContext } from '../../../context/HeaderContext';
import DisplayDate from '../../../utils/displayDate/DisplayDate';

const Chat = ({ memberId, handleChat, onCancel }) => {
  
  // 채팅 콘텍스트
  const { 
    chatList,
    getChatList,
    chatRoomId,
    isNewMessage,
    handleChatChange,
    sendMessage,
    inputChat,
    toggleIsNewMessage,
    hideChat,
    chatOtherUserInfo
  } = useContext(ChatContext)
  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);
  // 채팅 이벤트용 모달 상태
  const [ chatEventModal, setChatEventModal ] = useState(false);
  // 채팅 삭제 모달창 드롭다운 위치
  const [ onChatModalPos, setOnChatModalPos] = useState({ x: 0, y: 0 });
  // 채팅 이벤트용으로 클릭한 채팅의 아이디를 보관하는 변수
  const [ chatId, setChatId ] = useState(0);
  // 컴포넌트 내부 스크롤 상태를 조작하기 위해 받는 함수
  const scrollRef = useRef();

  // chatList가 바뀔 때마다 스크롤 화면을 맨 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatList]);

  // 채팅 리스트를 가져온다
  useEffect(() => {
    getChatList(memberId, chatRoomId)
    setChatEventModal(false)
  },[isNewMessage, chatRoomId, chatOtherUserInfo])
  
  useEffect(() => {
      if (handleChat) lockScroll();
      return () => unlockScroll();
  }, [handleChat]);

  return (
    <S.BackdropHide onClick={onCancel}>
      <S.ChatRoomContainer onClick={e => e.stopPropagation()}>
        {/* 채팅 타이틀 / 닫기 버튼 */}
        <S.TitleContainer>
          <S.Title>{chatOtherUserInfo.memberNickName}</S.Title>
          <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel}/>
        </S.TitleContainer>
        <S.ChatLogContainer ref={scrollRef}>
          {chatList.map((item) => 
            item.chatWriterMemberId !== memberId ? (
              <S.LeftChat key={item.id}>
                <S.LeftMemberImg
                  src={`http://localhost:10000/images/profile/${item.memberImgName}`}
                  onError={e => {
                    e.target.src = "/assets/images/header/default-member-img.png";
                  }}
                />
                <S.LeftTextContainer>
                  <S.LeftNickName>{item.memberNickname}</S.LeftNickName>
                <S.LeftChatInfoContainer>
                  <S.LeftContent>{item.chatContent}</S.LeftContent>
                  {DisplayDate(item.chatSendTime)}
                </S.LeftChatInfoContainer>
                </S.LeftTextContainer>
              </S.LeftChat>
            ) : (
              <S.RightChat key={item.id}>
                <S.RightChatInfoContainer>
                  <S.ChatReadingInfo>
                    {item.chatReading === 0 ? '1' : ''}
                  </S.ChatReadingInfo>
                  {DisplayDate(item.chatSendTime)}
                </S.RightChatInfoContainer>
                <S.RightContent
                  onClick={(e) => {
                    setChatId(item.id)
                    setChatEventModal(true)
                    setOnChatModalPos({ x: e.clientX, y: e.clientY });
                  }}
                >
                  {item.chatContent}
                </S.RightContent>
              </S.RightChat>
            )
          )}
        </S.ChatLogContainer>
        <S.ChatInputBox>
          <S.ChatInput
            maxLength={200}
            placeholder="메세지 입력"
            onChange={handleChatChange}
            spellCheck={false}
            value={inputChat}
            onDrop={e => e.preventDefault()}
            onDragOver={e => e.preventDefault()}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(chatRoomId, memberId, inputChat);
              }
            }}
          >
          </S.ChatInput>
          <S.SendButton 
            onClick={() => {
              sendMessage(chatRoomId, memberId, inputChat)
            }}
          >
            전송
          </S.SendButton>
        </S.ChatInputBox>

        {/* 채팅 이벤트용 모달 */}
        {chatEventModal && (
          <>
            <S.ChatModalContainer
              style={{ top: onChatModalPos.y, left: onChatModalPos.x }}
              onClick={(e) => {
                toggleIsNewMessage()
                hideChat(chatId, memberId)
              }}
            >
              <S.DeleteChatContent>
                채팅 삭제
              </S.DeleteChatContent>
            </S.ChatModalContainer>
            <S.BackdropHide 
              onClick={(e) => {
                e.stopPropagation()
                setChatEventModal(false)
              }}
            />
          </>
        )}
      </S.ChatRoomContainer>
    </S.BackdropHide>
  );
};

export default Chat;