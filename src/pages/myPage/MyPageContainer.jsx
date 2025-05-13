import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPageSidebar from './myPageSidebar/MyPageSidebar';

const MyPageContainer = () => {
  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
      <div style={{marginTop:'70px', width:"1400px", display:'flex', justifyContent:'space-between'}}>
        <div style={{width:"200px"}}>
          <MyPageSidebar />
        </div>
        <div style={{width:'1160px'}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyPageContainer;