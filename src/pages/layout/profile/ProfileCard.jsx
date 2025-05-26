import React, { useContext, useEffect } from 'react';
import S from './style';
import { NavLink } from 'react-router-dom';
import { ProfileCardContext } from '../../../context/ProfileCardContext';
import { HeaderContext } from '../../../context/HeaderContext';

const ProfileCard = ({memberId, profileCardMemberId, handleProfileCard, onCancel}) => {

  // 프로필 카드 콘텍스트
  const { profileCardInfo, getProfile, toggleFavorite, handleFollow } = useContext(ProfileCardContext);
  // 헤더 스크롤을 막는 상태
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  // 최초로 프로필 정보를 받는 함수
  useEffect(() => {
    getProfile(memberId, profileCardMemberId)
  }, [ memberId, profileCardMemberId])

  useEffect(() => {
      if (handleProfileCard) lockScroll();
      return () => unlockScroll();
  }, [handleProfileCard]);

  return (
    <S.CardContainer>
      {/* 프로필, 멤버 정보, 팔로잉 정보 */}
      <S.TopContainer>
        <S.MemberInfoContainer>
          <S.MemberProfile
            src={`http://localhost:10000/images/profile/${profileCardInfo.memberImgName}`}
            alt="멤버 프로필 이미지" 
            onError={e => {
                e.target.src = "/assets/images/header/default-member-img.png";
            }}
          />
          <S.MemberInfoTextContainer>
            <S.MemberNickName>
              {profileCardInfo.memberNickname}
            </S.MemberNickName>
            <S.MemberStatusMessage>
              {profileCardInfo.memberStatusMessage || '상태메세지 없음'}
            </S.MemberStatusMessage>
          </S.MemberInfoTextContainer>
        </S.MemberInfoContainer>
        <S.FollowInfoContainer>
          <S.FollowInfoContainer>
            {memberId !== profileCardInfo.id && (
              <>
                {profileCardInfo.isFollow === 1 ? (
                  profileCardInfo.favorite === 1 ? (
                    <S.FavoriteBtn 
                      src='/assets/images/follow/star-on.png' 
                      alt='즐겨찾기 활성화' 
                      onClick={() => toggleFavorite(memberId, profileCardMemberId)}
                    />
                  ) : (
                    <S.FavoriteBtn 
                      src='/assets/images/follow/star-off.png' 
                      alt='즐겨찾기 비활성화'
                      onClick={() => toggleFavorite(memberId, profileCardMemberId)}
                    />
                  )
                ) : null}

                <S.FollowBtn
                  onClick={() => handleFollow(memberId, profileCardMemberId)} 
                  $isFollow={profileCardInfo.isFollow}
                >
                  {profileCardInfo.isFollow === 1 ? (
                    <span>팔로잉</span>
                  ) : (
                    <span>팔로우</span>
                  )}
                </S.FollowBtn>
              </>
            )}
          </S.FollowInfoContainer>
        </S.FollowInfoContainer>
      </S.TopContainer>
      <S.FollowCountContainer>
        <S.FollowerCount>
          <S.FollowCountText>
            팔로워
          </S.FollowCountText>
          <S.FollowCountSubText>
            {profileCardInfo.followerCount}
          </S.FollowCountSubText>
        </S.FollowerCount>
        <S.FollowCount>
          <S.FollowCountText>
            팔로우
          </S.FollowCountText>
          <S.FollowCountSubText>
            {profileCardInfo.followingCount}
          </S.FollowCountSubText>
        </S.FollowCount>
      </S.FollowCountContainer>
      <S.AcheivementContainer>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
      </S.AcheivementContainer>
      <S.SocialButtonContainer>
        <NavLink to={`/main/mypage/${profileCardInfo.id}`}>
          <S.MyPageButton onClick={onCancel}>
              마이페이지
          </S.MyPageButton>
        </NavLink>
        <S.MessageButton>메세지</S.MessageButton>
      </S.SocialButtonContainer>
    </S.CardContainer>
  );
};

export default ProfileCard;
