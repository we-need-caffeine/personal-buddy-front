import React, { useState } from 'react';
import BoardBannerContainer from './banner/BoardBannerContainer';
import BoardPostListContainer from './postList/BoardPostListContainer';
import ScrollToTop from '../../../hooks/scrollToTop/ScrollToTop';

const BoardContainer = () => {
  const [postLists, setPostLists] = useState([]);

  return (
    <>
      <BoardBannerContainer dummyData={postLists} />
      <hr />
      <BoardPostListContainer setPostLists={setPostLists} />
      <ScrollToTop />
    </>
  );
};

export default BoardContainer;














// import React from 'react';
// import BoardBannerContainer from './banner/BoardBannerContainer';
// import BoardPostListContainer from './postList/BoardPostListContainer';

// const BoardContainer = () => {
//   return (
//     <div>
//       <BoardBannerContainer />
//       <hr />
//       <BoardPostListContainer />
//     </div>
//   );
// };

// export default BoardContainer;