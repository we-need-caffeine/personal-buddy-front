import React from 'react';
import { Outlet } from 'react-router-dom';

const FindPasswordContainer = () => {
  return (
    <div>
      비밀번호 찾기 컨테이너
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default FindPasswordContainer;