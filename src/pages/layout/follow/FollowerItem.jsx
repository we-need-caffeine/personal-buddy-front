import React, { useState } from 'react';
import S from './style';
import ProfileCard from '../profile/ProfileCard';

const FollowerItem = ({item, memberId, onCancel, profileMemberId, unfollow}) => {

  // 프로필 카드 상태
  const [showProfileCard, setShowProfileCard] = useState(false);
  // 프로필카드 드롭다운의 위치
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

  // 팔로워용 프로필 카드를 열고 닫는 함수
  const handleProfileCard = (state) => {
      setShowProfileCard(state)
  }

  return (
    <div>
      <S.ItemContainer key={item.id}>
        <S.MemberInfoContainer>
          <S.MemberImg
            src={`http://localhost:10000/images/profile/${item.memberImgName}`}
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
                    memberId={memberId}
                    profileCardMemberId={item.id}
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
                  onClick={() => {
                    setDropdownPos({ x: 0, y: 0 });
                    handleProfileCard(false)
                  }}
              />
            )}
          <S.MemberInfoTextContainer>
            <S.MemberStatusContainer>
              <S.MemberNickName>{item.memberNickname}</S.MemberNickName>
              {memberId === profileMemberId && 
                (item.isFollow === 1 &&
                  (item.favorite === 1 ? (
                    <S.MemberFavoriteImg src='/assets/images/follow/star-on.png' alt='즐겨찾기 활성화'/>
                  ) : (
                    <S.MemberStatusFollow>my팔로잉</S.MemberStatusFollow>
                  ))  
                )
              }
            </S.MemberStatusContainer>
            <S.MemberStatusMessage>{item.memberStatusMessage}</S.MemberStatusMessage>
          </S.MemberInfoTextContainer>
        </S.MemberInfoContainer>
        {memberId === profileMemberId && (
          <S.UnFollowBtn onClick={() => unfollow(item.id, memberId)}>
            삭제
          </S.UnFollowBtn>
        )}
      </S.ItemContainer>
    </div>
  );
};

export default FollowerItem;