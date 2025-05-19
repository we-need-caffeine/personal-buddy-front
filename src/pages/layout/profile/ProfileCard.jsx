import React, { useEffect } from 'react';
import S from './style';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCard = ({ profile, onCancel }) => {

  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;

  // 프로필카드가 활성화 될때, 컴포넌트 밖의 요소의 스크롤을 막는 함수
  useEffect(() => {
      if (profile) {
          document.body.style.overflow = 'hidden';
      }
      return () => {
          document.body.style.overflow = 'auto';
      };
  }, [profile]);

  if (!profile) return null;

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

                <S.FollowBtn isFollow={profile.isFollow}>
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
        <S.MyPageButton>
          <NavLink
            to={`/main/mypage/${profile.id}`}
            onClick={() => onCancel}
          >
            마이페이지
          </NavLink>
        </S.MyPageButton>
        <S.MessageButton>메세지</S.MessageButton>
      </S.SocialButtonContainer>
    </S.CardContainer>
  );
};

export default ProfileCard;
