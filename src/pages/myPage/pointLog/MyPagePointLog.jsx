import React from 'react';
import S from './style';

const MyPagePointLog = () => {
  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>포인트 내역을 확인할 수 있습니다.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>포인트 이용내역</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          1
        </S.BodyContainer>
      </S.MainContainer>
    </div>
  );
};

export default MyPagePointLog;