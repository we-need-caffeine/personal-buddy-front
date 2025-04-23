import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PointShopContainer = () => {
    return (
        <div>
          포인트 샵
          <div>
            포인트샵 컴포넌트
          </div>
          <div>
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

export default PointShopContainer;