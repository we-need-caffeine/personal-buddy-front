import React from 'react';
import S from './style'; // 프로필카드용 스타일(아래 예시 있음)

const ProfileCard = ({ profile }) => {
    
  if (!profile) return null;

  return (
    <S.CardContainer>
      <S.ProfileImg src={profile.profileImage || '/assets/images/defaultProfile.png'} alt="프로필" />
      <S.NickName>{profile.nickname}</S.NickName>
      <S.StatusMsg>{profile.statusMessage || '상태메시지 없음'}</S.StatusMsg>

      <S.FollowInfo>
        <div>
          <strong>{profile.followerCount}</strong>
          <span>팔로워</span>
        </div>
        <div>
          <strong>{profile.followingCount}</strong>
          <span>팔로잉</span>
        </div>
      </S.FollowInfo>

      {/* 팔로우/즐겨찾기 버튼 */}
      <S.ActionBox>
        <S.FollowButton isFollowing={profile.isFollowing}>
          {profile.isFollowing ? '팔로잉' : '팔로우'}
        </S.FollowButton>
        <S.StarButton isFavorite={profile.isFavorite}>
          {profile.isFavorite ? '★' : '☆'}
        </S.StarButton>
      </S.ActionBox>

      {/* 추가: DM/마이페이지 등 */}
      <S.ExtraActionBox>
        <button>DM</button>
        <button>마이페이지</button>
      </S.ExtraActionBox>
    </S.CardContainer>
  );
};

export default ProfileCard;
