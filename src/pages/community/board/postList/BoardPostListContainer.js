import React from 'react';
import { Link } from 'react-router-dom';

const BoardPostListContainer = () => {
  return (
    <div>
      <Link to={"post/1"}>게시글 1</Link>
      <Link to={"post/2"}>게시글 2</Link>
      <Link to={"post/3"}>게시글 3</Link>
      <Link to={"post/4"}>게시글 4</Link>
    </div>
  );
};

export default BoardPostListContainer;