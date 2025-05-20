import { createContext, useContext, useState } from 'react';

export const JoinContext = createContext();

export const JoinProvider = ({ children }) => {
  const [joinData, setJoinData] = useState({});

  return (
    <JoinContext.Provider value={{ joinData, setJoinData }}>
      {children}
    </JoinContext.Provider>
  );
};

// 훅으로 추출해서 사용하기 쉽게
export const useJoin = () => useContext(JoinContext);


