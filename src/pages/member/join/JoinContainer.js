import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { JoinContext } from "./JoinContext";

const JoinContainer = () => {
  const [joinData, setJoinData] = useState({
    agree: {},
    info: {},
    profile: {},
  });

  return (
    <JoinContext.Provider value={{ joinData, setJoinData }}>
      <Outlet /> {/* 하위 라우트 페이지들 (Agree, Info 등)을 렌더링 */}
    </JoinContext.Provider>
  );
};

export default JoinContainer;
