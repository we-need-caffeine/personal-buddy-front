import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LoginLayout = () => {
  const isLogin = true;

  if(!isLogin){
    return <Navigate to={"/member/login"} />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;