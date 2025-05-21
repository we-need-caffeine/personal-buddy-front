import React, { useState } from 'react';
import S from './style';
import ProfileCard from '../../layout/profile/ProfileCard';

const GuestItem = ({
  item, memberId, handleDelete, formatDate
}) => {

  const [showProfileCard, setShowProfileCard] = useState(false);

  // 프로필 카드 상태
  const handleProfileCard = (state) => {
      setShowProfileCard(state)
  }

  return (
    <S.GuestBookItemContainer key={item.id}>
        <S.GuestBookMemberInfoContainer>
            <S.GuestBookMemberInfo>
                <S.GuestBookMemberProfileImg 
                    src={item.memberImgPath || "/assets/images/header/default-member-img.png"}
                    alt='멤버 프로필 이미지'
                    onClick={(e) => {
                        handleProfileCard(true)
                    }}
                    onError={e => {
                        e.target.src = "/assets/images/header/default-member-img.png";
                    }}
                />
                {showProfileCard && (
                    <S.ProfileCardDropdown>
                        <ProfileCard
                            memberId={memberId}
                            profileCardMemberId={item.writerMemberId}
                            handleProfileCard={showProfileCard}
                            onCancel={() => handleProfileCard(false)}
                        />
                    </S.ProfileCardDropdown>
                )}
                { showProfileCard && (
                    <S.CardBG 
                        onClick={() => {handleProfileCard(false)}}
                    />
                )}
                <span>{item.writerName}</span>
            </S.GuestBookMemberInfo>
            {item.writerMemberId === memberId || item.ownerMemberId === memberId ? 
            (
                <S.GuestBookDeleteButton onClick={() => handleDelete(item.id)}>
                    <span>삭제</span>
                </S.GuestBookDeleteButton>
            ) : (
                <></>
            )}
        </S.GuestBookMemberInfoContainer>
        <S.GuestBookContent>
            <span>{item.guestbookContent}</span>
        </S.GuestBookContent>
        <S.GuestBookCreateTime>
            <span>{formatDate(item.guestbookCreateTime)}</span>
        </S.GuestBookCreateTime>
    </S.GuestBookItemContainer>
  );
};

export default GuestItem;