import React, { useEffect, useRef, useState } from 'react';
import S from '../style';

const Sticker = (
  {
    sticker, 
    memberAppliedItemsSticker, 
    setMemberAppliedItemSticker, 
    index, memberCustomizingList, 
    setMemberCustomizingList, 
    backgroundRef
  }) => {

  const [position, setPosition] = useState({
    x: sticker.treeCustomizingPositionX,
    y: sticker.treeCustomizingPositionY
  })
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 })

  const stickerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true)
    setStartOffset({
      mouseX : e.clientX,
      mouseY : e.clientY,
      posX : position.x,
      posY : position.y
    })
  }

  const handleMouseMove = (e) => {
    if(!isDragging) return;
    const dragX = e.clientX - startOffset.mouseX + startOffset.posX;
    const dragY = e.clientY - startOffset.mouseY + startOffset.posY;

    const bgRect = backgroundRef.current.getBoundingClientRect();
    
    const width = sticker.itemSizeWidth;
    const height= sticker.itemSizeHeight;

    const minX = 0;
    const minY = 0;
    const maxX = bgRect.width - width;
    const maxY = bgRect.height - height;

    const clampedX = Math.max(minX, Math.min(dragX, maxX));
    const clampedY = Math.max(minY, Math.min(dragY, maxY));

    stickerRef.current.style.left = `${clampedX}px`;
    stickerRef.current.style.top = `${clampedY}px`;

    // setPosition({
    //   ...position, 
    //   x : clampedX,
    //   y: clampedY
    // })
  }

  const handleMouseUp = (e) => {
    if(!isDragging) return;
    setIsDragging(false)

    const left = parseInt(stickerRef.current.style.left);
    const top = parseInt(stickerRef.current.style.top);
    setPosition({
      ...position, 
      x : left,
      y: top
    })

    const updatedSticker = {
      ...sticker, 
      treeCustomizingPositionX : left, 
      treeCustomizingPositionY : top
    }

    setMemberAppliedItemSticker((prev) => 
      prev.map(item => item.treeCustomizingId === updatedSticker.treeCustomizingId ? updatedSticker : item)
    );
    setMemberCustomizingList((prev) => 
      prev.map(item => item.treeCustomizingId === updatedSticker.treeCustomizingId ? updatedSticker : item
      )
    )
  }

 useEffect(() => {
      if(isDragging){
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }else{
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
      }

    }, [position, isDragging, startOffset])

  return (
    <S.MyTreeItemStickerIcon 
      url={
        sticker.itemImgPath && sticker.itemImgName
        ?
        `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${sticker.itemImgPath}&fileName=${sticker.itemImgName}`
        :
        ""
      }
      onMouseDown={handleMouseDown}
      xLocation={position.x}
      yLocation={position.y}
      width={sticker.itemSizeWidth}
      height={sticker.itemSizeHeight}
      ref={stickerRef}
    />
  );
};

export default Sticker;