import React from 'react';

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
    <div>
      <button onClick={navigateGoogleAuth}>구글 로그인</button>
      <button onClick={navigateKaKaoAuth}>카카오 로그인</button>
      <button onClick={navigateNaverAuth}>네이버 로그인</button>
    </div>
  );
};

export default SocialLogin;