import React from 'react';
import { Outlet } from 'react-router-dom';

const MyPageContainer = () => {
  return (
    <div>
      <div>프로필</div>
      <div><Outlet /></div>
    </div>
  );
};

export default MyPageContainer;