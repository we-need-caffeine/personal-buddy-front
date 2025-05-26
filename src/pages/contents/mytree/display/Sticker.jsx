import React, { useEffect, useState } from 'react';
import S from '../style';

const Sticker = ({sticker, memberAppliedItemsSticker, setMemberAppliedItemSticker, index}) => {

  const [position, setPosition] = useState({
    x: sticker.treeCustomizingPositionX,
    y: sticker.treeCustomizingPositionY
  })
  const [isDragging, setIsDragging] = useState(false);
  const [startOffset, setStartOffset] = useState({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 })

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
    
    setPosition({
      ...position, 
      x : dragX,
      y: dragY
    })
  }

  const handleMouseUp = (e) => {
    if(!isDragging) return;
    setIsDragging(false)

    const updatedSticker = {
      ...sticker, 
      treeCustomizingPositionX : position.x, 
      treeCustomizingPositionY : position.y
    }

    const newSticker = [...memberAppliedItemsSticker];
    newSticker[index] = updatedSticker;
    setMemberAppliedItemSticker(newSticker)
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
      url={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${sticker.itemImgPath}&fileName=${sticker.itemImgName}`}
      onMouseDown={handleMouseDown}
      xLocation={position.x}
      yLocation={position.y} />
  );
};

export default Sticker;