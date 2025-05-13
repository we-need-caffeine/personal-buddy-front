import React, { useEffect, useState } from 'react';
import S from './style';

const BoardBannerContainer = () => {

  const [hotPosts, setHotPosts] = useState([]);

  useEffect(()=>{
    const fetchHotPosts = async () => {
      try{
        const response = await fetch("/boards/api/hot")
        const data = await response.json();

        setHotPosts(data);
      } catch {
      console.error("HOT 게시글 조회 실패")
    }
  };
    fetchHotPosts();
  }, []);
  
    
  return (
      <S.HotWrapper>
        <S.SubTitle>TOP10</S.SubTitle>
        <S.MainTitle>버디들의 HOT 🔥</S.MainTitle>

        
      </S.HotWrapper>
  );
};

export default BoardBannerContainer;