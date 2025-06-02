import React, { useContext, useState } from 'react';
import S from './style';
import ProfileCard from '../profile/ProfileCard';
import ChangeDate from '../../../utils/changeDate/ChangeDate';
import Chat from './Chat';
import { ChatContext } from '../../../context/ChatContext';


const ChatRoomItem = ({i, item, memberId, toggleIsNewMessage}) => {

  // 채팅 콘텍스트
  const { 
    showChat,
    handleChat,
    startChatting,
    hideChatRoom
  } = useContext(ChatContext);

  // 프로필 카드 상태값
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 프로필카드 드롭다운의 위치
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

  // 프로필 카드 상태 변환 함수
  const handleProfileCard = (state) => {
      setShowProfileCard(state)
  }

  return (
    <>
      <S.ItemContainer 
        onClick={() => {
          startChatting(memberId, item.memberId)
          handleChat(true)
        }}
      >
        <S.MemberInfoContainer>
          <S.MemberImg
            src={`http://localhost:10000/images/profile/${item.memberImgName}`}
            alt='멤버 프로필 이미지'
            onClick={(e) => {
              e.stopPropagation();
              setDropdownPos({ x: e.clientX, y: e.clientY });
              handleProfileCard(true)
            }}
            onError={e => {
              e.target.src = "/assets/images/header/default-member-img.png";
            }}
            />
            {/* 프로필 카드 영역 */}
            {showProfileCard && (
              <>
                <S.ProfileCardDropdown
                  onClick={e => e.stopPropagation()}
                  style={{ top: dropdownPos.y, left: dropdownPos.x }}
                >
                  <ProfileCard
                    memberId={memberId}
                    profileCardMemberId={item.memberId}
                    handleProfileCard={showProfileCard}
                    onCancel={() => {
                      handleProfileCard(false)
                    }}
                  />
                </S.ProfileCardDropdown>
                <S.CardBG 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProfileCard(false)
                  }}
                />
              </>
            )}
          <S.MemberInfoTextContainer>
            <S.MemberStatusContainer>
              <S.MemberNickName>{item.memberNickName}</S.MemberNickName>
              {item.unReadCount > 0 && (
                <S.UnReadCount>
                  {item.unReadCount > 999 ? "999+" : item.unReadCount}
                </S.UnReadCount>
              )}
            </S.MemberStatusContainer>
            <S.MemberStatusMessage>
              {item.chatRoomLastChat || '메세지가 없습니다.'}
            </S.MemberStatusMessage>
          </S.MemberInfoTextContainer>
        </S.MemberInfoContainer>
        <S.RightContainer>
          <S.LastChatDate>
            {ChangeDate(item.chatRoomLastChatTime) || '--'}
          </S.LastChatDate>
          <S.OutChatRoom
            onClick={(e) => {
              e.stopPropagation()
              hideChatRoom(memberId, item.chatRoomId)
              toggleIsNewMessage()
            }}
          >
            채팅방 나가기
          </S.OutChatRoom>
        </S.RightContainer>
      </S.ItemContainer>
      {/* 채팅 */}
      {showChat && (
        <Chat
          memberId={memberId}
          handleChat={showChat}
          onCancel={() => {
            handleChat(false)
          }}
        />
      )}
    </>
  );
};

export default ChatRoomItem;