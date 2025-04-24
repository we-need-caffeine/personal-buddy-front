import React from 'react';
import { Outlet } from 'react-router-dom';

const MemberLayout = () => {
  return (
    <div>
      <div>
        <p>나 로봇! 😎</p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;