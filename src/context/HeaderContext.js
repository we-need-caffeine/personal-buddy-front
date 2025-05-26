import { createContext, useRef, useState } from 'react';

export const HeaderContext = createContext();

export const HeaderProvider  = ({ children }) => {
  // 헤더 이벤트 상태
  const [headerScroll, setHeaderScroll] = useState(true);
  // 헤더 드롭 여부
  const [showHeader, setShowHeader] = useState(true);
  
  const lockCount = useRef(0);

  const lockScroll = () => {
    lockCount.current += 1;
    if (lockCount.current === 1) {
      setHeaderScroll(false)
      document.body.style.overflow = 'hidden';
    }
  };

  const unlockScroll = () => {
    lockCount.current = Math.max(lockCount.current - 1, 0);
    if (lockCount.current === 0) {
      setHeaderScroll(true)
      document.body.style.overflow = 'auto';
    }
  };

  //----------------------------[ 외부 요소 스크롤을 막는 함수 ]
  // const { lockScroll, unlockScroll } = useContext(HeaderContext);
  // useEffect(() => {
  //     if (handleConfrmModal) lockScroll();
  //     return () => unlockScroll();
  // }, [handleConfrmModal]);


  return (
    <HeaderContext.Provider value={{
      headerScroll,
      setHeaderScroll,
      lockScroll, 
      unlockScroll,
      showHeader,
      setShowHeader
    }}>
      {children}
    </HeaderContext.Provider>
  );
};
