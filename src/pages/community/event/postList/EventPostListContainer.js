import React from 'react';
import { Link } from 'react-router-dom';

const EventPostListContainer = () => {
  return (
    <div>
      <Link to={"post/1"}>게시글1</Link>
      <Link to={"post/2"}>게시글2</Link>
      <Link to={"post/3"}>게시글3</Link>
    </div>
  );
};

export default EventPostListContainer;