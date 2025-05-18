import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { boardDummyData } from '../../../../data/boardDummy';

const BoardContainer = () => { // 게시글 리스트를 담는 상태값
  const [postLists, setPostLists] = useState([]);

  useEffect(() => {
    setPostLists(boardDummyData); // 더미데이터
    // console.log('더미 드루와', boardDummyData);
  }, []);

  return <Outlet context={{ postLists }} />; // postList를 context로 넘겨준다.
};

export default BoardContainer;
