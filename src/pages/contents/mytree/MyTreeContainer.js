import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import S from './style';

const MyTreeContainer = () => {
  
    const location = useLocation();
    const pathName = location.pathname;

    const backgroundRef = useRef(null);
    const stickerRef = useRef(null);
    const isDragging = useRef(false);
    const startOffset = useRef({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        const backgroundRect = backgroundRef.current.getBoundingClientRect();
        startOffset.current.x = e.clientX - backgroundRect.left - startPos.x;
        startOffset.current.y = e.clientY - backgroundRect.top - startPos.y;
        
        isDragging.current = true;
    };

    
    useEffect(() => {
      const handleMouseMove = (e) => {
          if (!isDragging.current) return;
          const backgroundRect = backgroundRef.current.getBoundingClientRect();
          const stickerRect = stickerRef.current.getBoundingClientRect();

          const newX = e.clientX - backgroundRect.left - startOffset.current.x;
          const newY = e.clientY - backgroundRect.top - startOffset.current.y;
          
          const clampedX = Math.max(0, Math.min(newX, backgroundRect.width - stickerRect.width));
          const clampedY = Math.max(0, Math.min(newY, backgroundRect.height - stickerRect.height));

          // 리렌더 없이 스타일만 조작
          if (stickerRef.current) {
              stickerRef.current.style.left = `${clampedX}px`;
              stickerRef.current.style.top = `${clampedY}px`;
          }
      };

      const handleMouseUp = () => {
        const backgroundRect = backgroundRef.current.getBoundingClientRect();
        const stickerRect = stickerRef.current.getBoundingClientRect();

        const finalX = stickerRect.left - backgroundRect.left;
        const finalY = stickerRect.top - backgroundRect.top;

        // 최종 위치 적용
        setStartPos({ x: finalX, y: finalY });

        startOffset.current.x = 0;
        startOffset.current.y = 0;
        isDragging.current = false;

      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
      }

      
    }, [])

  const getSeleted = (pathName) => {
    if(pathName == "/main/contents/mytree") {
      return 'all'
    } else if(pathName == "/main/contents/mytree/background") {
      return 'background'
    } else if(pathName == "/main/contents/mytree/sticker"){
      return 'sticker'
    } else if(pathName == "/main/contents/mytree/tree"){
      return 'tree'
    }
  }

  return (
    <div>
      <S.SubTitle>언젠가는 아름다워질 나의 나무 ✨</S.SubTitle>
      <S.MainTitle>나의 성장 나무 🌳</S.MainTitle>
      <S.MyTreeWrapper>
                <S.MyTreeBackGround ref={backgroundRef}>
                    <S.MyTreeItemStickerIcon
                        ref={stickerRef}
                        onMouseDown={handleMouseDown}
                        xLocation={startPos.x} 
                        yLocation={startPos.y} 
                    />
                    <S.MyTreeItemTreeIcon/>
                </S.MyTreeBackGround>
                <S.ButtonWrapper>
                    <S.SaveButton>저장</S.SaveButton>
                    <S.CancelButton>취소</S.CancelButton>
                </S.ButtonWrapper>
      </S.MyTreeWrapper>
      <S.SubTitle>아이템을 직접 적용 시켜봐요 😎</S.SubTitle>
      <S.MainTitle>아이템 목록 💼</S.MainTitle>
      <div>
        <S.ItemTabBox>
          <S.ItemTabLink selected={getSeleted(pathName) == 'all'} to={""}>전체</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) == 'background'} to={"background"}>배경</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) == 'sticker'} to={"sticker"}>스티커</S.ItemTabLink>
          <S.ItemTabLink selected={getSeleted(pathName) == 'tree'} to={"tree"}>나무</S.ItemTabLink>
        </S.ItemTabBox>
        <Outlet />
      </div>
    </div>
  );
};

export default MyTreeContainer;