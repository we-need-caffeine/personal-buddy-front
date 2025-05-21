import React from 'react';
import S from './style';

const SocialLogin = () => {

  // 소셜 로그인
  const navigateGoogleAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/google"
  }
  const navigateKaKaoAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/kakao"
  }
  const navigateNaverAuth = () => {
    window.location.href = "http://localhost:10000/oauth2/authorization/naver"
  }


  return (
    <S.ButtonWrapper>
      <S.SocialButton onClick={navigateKaKaoAuth}>
        <img src="/assets/images/member/kakao-logo.png" alt="Kakao" />Kakao 계정으로 로그인
      </S.SocialButton>
      <S.SocialButton onClick={navigateNaverAuth}>
        <img src="/assets/images/member/naver-logo.png" alt="naver" />Naver 계정으로 로그인
      </S.SocialButton>
      <S.SocialButton onClick={navigateGoogleAuth}>
        <img src="/assets/images/member/google-logo.png" alt="google" />Google 계정으로 로그인
      </S.SocialButton>
  </S.ButtonWrapper>
  );
};

export default SocialLogin;