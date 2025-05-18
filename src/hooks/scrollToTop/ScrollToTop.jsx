import React, { useEffect, useState } from 'react';
import S from './style';


const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // 스크롤 위치 감지
  const handleScroll = () => {
    setVisible(window.scrollY > 300); // 300px 이상 스크롤하면 보여준다
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <S.TopButton onClick={scrollToTop} $visible={visible}>
      <S.Triangle />
    </S.TopButton>
  );
};

export default ScrollToTop;
