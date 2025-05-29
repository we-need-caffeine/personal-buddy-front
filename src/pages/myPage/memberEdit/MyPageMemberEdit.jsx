import React from 'react';
import S from './style';

const MyPageMemberEdit = () => {
  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>계정 정보를 변경할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>계정 설정</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          1
        </S.BodyContainer>
      </S.MainContainer>
    </div>
  );
};

export default MyPageMemberEdit;