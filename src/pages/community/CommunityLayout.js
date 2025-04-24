import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const CommunityLayout = () => {
  return (
    <div>
      <div>
        <div>
          <Link to={"/main/community/event"}>EVENT</Link>
          <Link to={"/main/community/board"}>BOARD</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CommunityLayout;