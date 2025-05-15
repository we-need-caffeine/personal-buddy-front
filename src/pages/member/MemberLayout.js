import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100vh;
`;

const LogoWrapper = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;

  img {
    display: block;
    margin: 0 auto;
    width: 260px;
    height: 155px;
  }
`;

const MemberLayout = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <img src="/assets/images/member/logo.png" alt="로고" />
      </LogoWrapper>
      <Outlet />
    </Wrapper>
  );
};

export default MemberLayout;
