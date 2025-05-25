import React, { useState } from 'react';
import S from './style';
import ProfileCard from '../profile/ProfileCard';

const ChatRoomItem = ({item, memberId, onCancel, setChatRoomId, handleChat}) => {

  // 프로필 카드 상태값
  const [showProfileCard, setShowProfileCard] = useState(false);

  // 프로필 카드 상태 변환 함수
  const handleProfileCard = (state) => {
      setShowProfileCard(state)
  }

  return (
    <>
      <S.ItemContainer 
        onClick={() => {
          setChatRoomId(item.chatRoomId)
          handleChat()
        }}
      >
        <S.MemberInfoContainer>
          <S.MemberImg
            src={`http://localhost:10000/images/profile/${item.memberImgName}`}
            alt='멤버 프로필 이미지'
            onClick={(e) => {
              e.stopPropagation();
              handleProfileCard(true)
            }}
            onError={e => {
              e.target.src = "/assets/images/header/default-member-img.png";
            }}
            />
            {/* 프로필 카드 영역 */}
            {showProfileCard && (
              <S.ProfileCardDropdown>
                <ProfileCard
                    memberId={memberId}
                    profileCardMemberId={item.memberId}
                    handleProfileCard={showProfileCard}
                    onCancel={() => {
                      handleProfileCard(false)
                      onCancel();
                    }}
                />
              </S.ProfileCardDropdown>
            )}
            {showProfileCard && (
              <S.CardBG 
                  onClick={() => {handleProfileCard(false)}}
              />
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
          <S.LastChatDate>오전 11:20</S.LastChatDate>
          <S.OutChatRoom>채팅방 나가기</S.OutChatRoom>
        </S.RightContainer>
        {/* {item.chatRoomLastChatDate && (
          <S.LastChatDate>{item.chatRoomLastChatDate}</S.LastChatDate>
        )} */}  
      </S.ItemContainer>
    </>
  );
};

export default ChatRoomItem;