import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ContentsContainer = () => {
  return (
    <div>
      <div>
        <Link to={"achivement"}>업적</Link>        
        <Link to={"mytree"}>나의 성장나무</Link>        
        <Link to={"point-shop"}>포인트샵</Link>        
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ContentsContainer;