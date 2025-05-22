import React from 'react';
import { Outlet } from 'react-router-dom';
import S from './style';

const LoginContainer = () => {
  return (
    <S.Container>
      <S.LoginBox>
        <S.LoginSelect>
          <S.Tab to="/member/login" end>이메일 로그인</S.Tab>
          <S.Tab to="/member/login/social" right>간편 로그인</S.Tab>
        </S.LoginSelect>
        <Outlet />
      </S.LoginBox>

      <S.BottomLinks>
        <a href="/member/find-id">아이디 찾기</a> |
        <a href="/member/find-password/identify"> 비밀번호 찾기</a> |
        <a href="/member/join"> 회원가입</a>
      </S.BottomLinks>
    </S.Container>
  );
};

export default LoginContainer;
