import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  background: white;
  border: solid 1px #ccc;
  border-radius: 30px;
  width: 450px;
  min-height: 380px;
  text-align: center;
  margin-top: 30px;
`;

const LoginSelect = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 25px;
`;

const Tab = styled(Link)`
  width: 50%;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  border-top-right-radius: ${props => (props.right ? '30px' : '0')};
  background-color: ${props => (props.active ? '#D9D9D9' : 'transparent')};
`;

const BottomLinks = styled.div`
  color: #218838;
  margin-top: 15px;
  font-size: 13px;
  font-weight: 300;

  a {
    color: #aaa;
    margin: 0 5px;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
      text-decoration: underline;
    }
  }
`;

const LoginContainer = () => {
  return (
    <Container>
      <LoginBox>
        <LoginSelect>
          <Tab to="/member/login">이메일 로그인</Tab>
          <Tab to="/member/login/social" right active>간편 로그인</Tab>
        </LoginSelect>
        <Outlet />
      </LoginBox>

      <BottomLinks>
        <a href="#">아이디 찾기</a> |
        <a href="#">비밀번호 찾기</a> |
        <a href="#">회원가입</a>
      </BottomLinks>
    </Container>
  );
};

export default LoginContainer;
