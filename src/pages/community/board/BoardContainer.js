import React from 'react';
import BoardBannerContainer from './banner/BoardBannerContainer';
import BoardPostListContainer from './postList/BoardPostListContainer';

const BoardContainer = () => {
  return (
    <div>
      <BoardBannerContainer />
      <hr />
      <BoardPostListContainer />
    </div>
  );
};

export default BoardContainer;