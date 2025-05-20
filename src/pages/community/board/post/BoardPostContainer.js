// 전체 보드 화면만 rendering하는 container

import { Outlet, useLocation } from 'react-router-dom';

const BoardPostContainer = () => {

  const location = useLocation();
  const boards = location.state;

  return <Outlet context={{ postLists: boards }} /> ;  
};

export default BoardPostContainer;
