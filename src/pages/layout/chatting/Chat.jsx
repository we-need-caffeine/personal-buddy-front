import { useContext, useEffect, useRef } from 'react';
import S from './style';
import { ChatContext } from '../../../context/ChatContext';

const Chat = ({ memberId, chatRoomId, onCancel }) => {

  // 채팅 콘텍스트
  const { chatList, getChatList, inputChat, handleChatChange, sendMessage } = useContext(ChatContext)

  // 컴포넌트 내부
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatList]); // chatList가 바뀔 때마다 맨 아래로

  useEffect(() => {
    getChatList(memberId, chatRoomId)
  },[chatRoomId, memberId])
  
  useEffect(() => {
    console.log("최신 chatList:", chatList);
  }, [chatList]);

  return (
    <S.ChatRoomContainer>
      {/* 메세지 타이틀 / 닫기 버튼 */}
      <S.TitleContainer>
        <S.Title>메세지</S.Title>
        <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼' onClick={onCancel}/>
      </S.TitleContainer>
      <S.ChatLogContainer ref={scrollRef}>
        {chatList.map((item, i) => 
          item.chatWriterMemberId !== memberId ? (
            <S.LeftChat key={i}>
              <S.LeftMemberImg 
                src={`http://localhost:10000/images/profile/${item.memberImgName}`}
                onError={e => {
                  e.target.src = "/assets/images/header/default-member-img.png";
                }}
              />
              <S.LeftTextContainer>
                <S.LeftNickName>{item.memberNickname}</S.LeftNickName>
                <S.LeftContent>{item.chatContent}</S.LeftContent>
              </S.LeftTextContainer>
            </S.LeftChat>
          ) : (
            <S.RightChat key={i}>
              <S.RightContent>{item.chatContent}</S.RightContent>
            </S.RightChat>
          )
        )}
      </S.ChatLogContainer>
      <S.ChatInputBox>
        <S.ChatInput
          maxLength={200}
          placeholder="메세지 입력"
          onChange={handleChatChange}
          value={inputChat}
          spellCheck={false}
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
        <S.SendButton onClick={() => sendMessage(chatRoomId, memberId, inputChat)}>
          전송
        </S.SendButton>
      </S.ChatInputBox>
    </S.ChatRoomContainer>
  );
};

export default Chat;