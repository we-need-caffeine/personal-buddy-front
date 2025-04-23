import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyTreeContainer = () => {
  return (
    <div>
      나의 나무
      <div>
        성장 나무 컴포넌트
      </div>
      <div>
        나무 꾸미기
        <div>
          <Link to={""}>전체</Link>
          <Link to={"background"}>배경</Link>
          <Link to={"sticker"}>스티커</Link>
          <Link to={"tree"}>나무</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyTreeContainer;