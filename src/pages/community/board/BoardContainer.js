import React from 'react';
import BoardBannerContainer from './banner/BoardBannerContainer';
import BoardPostListContainer from './postList/BoardPostListContainer';

const BoardContainer = () => {
  return (
    <div>
      보드 컨테이너!
      <BoardBannerContainer />
      <hr />
      <BoardPostListContainer />
    </div>
  );
};

export default BoardContainer;