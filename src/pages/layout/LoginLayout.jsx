import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// 나중에 Context나 Redux로 바꾸기
const isLogin = true; // true면 로그인 상태(main으로 이동), false면 로그아웃 상태(member/login으로 이동)

const LoginLayout = () => {
  if (!isLogin) {
    return <Navigate to="/member/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
