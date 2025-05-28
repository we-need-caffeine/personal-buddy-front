import React from 'react';
import S from './style';

const MyPagePosts = () => {

  return (
    <>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>내가 커뮤니티에 등록한 게시물을 확인할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>내 게시물</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
      </S.MainContainer>
    </>
  );
};

export default MyPagePosts;