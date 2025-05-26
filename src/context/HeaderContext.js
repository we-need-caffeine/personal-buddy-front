import { createContext, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider  = ({ children }) => {
  // 헤더 스크롤 이벤트 상태값
  const [headerScroll, setHeaderScroll] = useState(true);

  // 밸류에 담아서 한번에 내보내야함

  return (
    <HeaderContext.Provider value={{ 
      headerScroll, 
      setHeaderScroll, 
    }}>
      {children}
    </HeaderContext.Provider>
  );
};
