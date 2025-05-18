import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { boardDummyData } from '../../../../data/boardDummy';

const BoardContainer = () => {
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    setPostLists(boardDummyData);
  }, []);

  return <Outlet context={{ postLists }} />;
};

export default BoardContainer;
