import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import MyTree from './items/MyTree';
import S from './style';

const MyTreeContainer = () => {
  return (
    <div>
      <S.SubTitle>언젠가는 아름다워질 나의 나무 ✨</S.SubTitle>
      <S.MainTitle>나의 성장 나무 🌳</S.MainTitle>
      <MyTree>
        성장 나무 컴포넌트
      </MyTree>
      <div>
        나무 꾸미기
        <div>
          <Link to={""}>전체</Link>
          <Link to={"background"}>배경</Link>
          <Link to={"sticker"}>스티커</Link>
          <Link to={"tree"}>나무</Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyTreeContainer;