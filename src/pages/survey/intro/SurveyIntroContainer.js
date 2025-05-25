import React from 'react';
import S from './style';

const SurveyIntroContainer = () => {
  return (
    <S.Container>
      <S.SpeechBubble>
        더 나은 맞춤형 경험을 위해 간단한 취향 조사를<br />
        진행하고 있어요! 여러분의 라이프스타일과 관심사를<br />
        반영하여, 일정과 추천 콘텐츠를 더욱 편리하게<br />
        제공해드릴게요.
      </S.SpeechBubble>

      <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />

      <S.StartLink to="/survey">시작하기</S.StartLink>
    </S.Container>
  );
};

export default SurveyIntroContainer;
