import React from 'react';
import { Link } from 'react-router-dom';

const FindId = () => {
  return (
    <div>
      아이디 찾기
      <Link to={"/member/find-id-complete"}>아이디 찾기 완료</Link>
    </div>
  );
};

export default FindId;