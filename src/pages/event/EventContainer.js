import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const EventContainer = () => {
    return (
        <div>
          이벤트
          <div>
          </div>
          <div>
            <div>
              <Link to={""}>이벤트 메인</Link>
              <Link to={"post"}>이벤트 상세</Link>
            </div>
            <Outlet />
          </div>
        </div>
      );
};

export default EventContainer;