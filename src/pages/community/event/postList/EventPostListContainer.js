import React from 'react';
import S from './style';

const EventPostListContainer = () => {
  return (
    <S.PostSection>
      <S.SubTitle>BUDDYGROUND</S.SubTitle>
      <S.MainTitle>버디들의 챌린지</S.MainTitle>

      <S.PostList>
        <S.PostCard />
        <S.PostCard />
        <S.PostCard />
        <S.PostCard />
        <S.PostCard />
        <S.PostCard />
      </S.PostList>
    </S.PostSection>
  );
};

export default EventPostListContainer;
