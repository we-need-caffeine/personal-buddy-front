import React, { useState } from 'react';
import S from './style';
import ProfileCard from '../../layout/profile/ProfileCard';

const GuestItem = ({
  item, memberId, onAskDelete, formatDate
}) => {

    // 프로필 카드 상태
    const [showProfileCard, setShowProfileCard] = useState(false);
    // 프로필카드 드롭다운의 위치
    const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

    // 마이페이지용 프로필 카드를 열고 닫는 함수
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
                        setDropdownPos({ x: e.clientX, y: e.clientY });
                        handleProfileCard(true)
                        }}
                        onError={e => {
                            e.target.src = "/assets/images/header/default-member-img.png";
                        }}
                    />
                    {/* 프로필 카드 영역 */}
                    {showProfileCard && (
                        <S.ProfileCardDropdown
                            style={{ top: dropdownPos.y, left: dropdownPos.x }}
                        >
                        <ProfileCard
                            memberId={memberId} // 로그인된 유저의 아이디
                            profileCardMemberId={item.writerMemberId} // 정보를 볼 유저의 아이디
                            handleProfileCard={showProfileCard}
                            onCancel={() => handleProfileCard(false)}
                        />
                        </S.ProfileCardDropdown>
                    )}
                    { showProfileCard && (
                        <S.CardBG 
                            onClick={() => {
                                handleProfileCard(false)
                                setDropdownPos({ x: 0, y: 0 });
                            }}
                        />
                    )}
                    <span>{item.writerName}</span>
                </S.GuestBookMemberInfo>
                {item.writerMemberId === memberId || item.ownerMemberId === memberId ? 
                (
                    <S.GuestBookDeleteButton onClick={() => onAskDelete(item.id)}>
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