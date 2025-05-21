import { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider  = ({ children }) => {
  // 헤더 이벤트 상태값
  const [headerScroll, setHeaderScroll] = useState(true);

  return (
    <HeaderContext.Provider value={{ headerScroll, setHeaderScroll }}>
      {children}
    </HeaderContext.Provider>
  );
};
