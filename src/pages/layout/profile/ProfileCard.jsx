import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink } from 'react-router-dom';

const ProfileCard = ({memberId, profileCardMemberId, handleProfileCard}) => {
  // 프로필 정보를 담는 상태
  const [profile, setProfile] = useState({})

  // 팔로우 / 언팔로우
  const handleFollow = async () => {
      if (profile.isFollow === 1) {
          const response = await fetch(`http://localhost:10000/follows/api/follow/delete?followerMemberId=${profileCardMemberId}&followingMemberId=${memberId}`, {
              method: "DELETE"
          })
          if (response.ok) {
              alert("팔로우 취소")
              getProfile()
          } else {
          }
      } else {
          const response = await fetch(`http://localhost:10000/follows/api/follow/${profileCardMemberId}?followingMemberId=${memberId}`, {
              method: "POST"
          })
          
          if (response.ok) {
              alert("팔로우 성공")
              getProfile()
          } else {
          }
      }
  }
  
  // 프로필 정보를 가져오는 함수
  const getProfile = async () => {
    const response = await fetch(`http://localhost:10000/follows/api/profile-card?memberId=${memberId}&profileCardMemberId=${profileCardMemberId}`)
    const datas = await response.json()
    setProfile(datas)
  }

  // 최초로 프로필 정보를 받는 함수
  useEffect(() => {
    getProfile()
  }, [memberId, profileCardMemberId])

  // 외부요소의 스크롤을 막는 함수
  useEffect(() => {
    if (handleProfileCard) {
        document.body.style.overflow = 'hidden';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [handleProfileCard]);

  return (
    <S.CardContainer>
      {/* 프로필, 멤버 정보, 팔로잉 정보 */}
      <S.TopContainer>
        <S.MemberInfoContainer>
          <S.MemberProfile
            src={profile.memberImgPath || "/assets/images/header/default-member-img.png"}
            alt="멤버 프로필 이미지" 
            onError={e => {
                e.target.src = "/assets/images/header/default-member-img.png";
            }}
          />
          <S.MemberInfoTextContainer>
            <S.MemberNickName>{profile.memberNickname}</S.MemberNickName>
            <S.MemberStatusMessage>{profile.memberStatusMessage || '상태메세지 없음'}</S.MemberStatusMessage>
          </S.MemberInfoTextContainer>
        </S.MemberInfoContainer>
        <S.FollowInfoContainer>
          <S.FollowInfoContainer>
            {memberId !== profile.id && (
              <>
                {profile.isFollow === 1 ? (
                  profile.favorite === 1 ? (
                    <S.FavoriteBtn src='/assets/images/follow/star-on.png' alt='즐겨찾기 활성화' />
                  ) : (
                    <S.FavoriteBtn src='/assets/images/follow/star-off.png' alt='즐겨찾기 비활성화' />
                  )
                ) : null}

                <S.FollowBtn
                  onClick={() => handleFollow()} 
                  isFollow={profile.isFollow}
                >
                  {profile.isFollow === 1 ? (
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
            {profile.followerCount}
          </S.FollowCountSubText>
        </S.FollowerCount>
        <S.FollowCount>
          <S.FollowCountText>
            팔로우
          </S.FollowCountText>
          <S.FollowCountSubText>
            {profile.followingCount}
          </S.FollowCountSubText>
        </S.FollowCount>
      </S.FollowCountContainer>
      <S.AcheivementContainer>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
        <S.AcheivementItems src='/assets/images/header/default-achivement-img.png' alt='업적'/>
      </S.AcheivementContainer>
      <S.SocialButtonContainer>
        <NavLink to={`/main/mypage/${profile.id}`}>
          <S.MyPageButton onClick={() => {handleProfileCard(false)}}>
              마이페이지
          </S.MyPageButton>
        </NavLink>
        <S.MessageButton>메세지</S.MessageButton>
      </S.SocialButtonContainer>
    </S.CardContainer>
  );
};

export default ProfileCard;
