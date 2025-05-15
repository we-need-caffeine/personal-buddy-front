import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPageSidebar from './myPageSidebar/MyPageSidebar';
import S from './style';

const MyPageContainer = () => {
  return (
    <>
      <S.MainContainer>
        <S.SideBarContainer>
          <MyPageSidebar />
        </S.SideBarContainer>
        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </S.MainContainer>
    </>
  );
};

export default MyPageContainer;