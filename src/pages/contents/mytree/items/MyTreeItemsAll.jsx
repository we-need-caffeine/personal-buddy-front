import React, { useState } from 'react';
import S from '../style';

const MyTreeItemsAll = () => {

  const [selectedItemCard, setSelectedItemCard] = useState(-1);

  const ItemsDummy = [
    {
      itemId: 1,
      itemIndex: 1,
      itemType: "스티커",
      itemImgUrl: "/assets/images/contents/tree/item/sticker/minipin.png",
      itemCount: "20",
      itemName: "강이",
      itemWidth: 60,
      itemHeight: 60,
    },
    {
      itemId: 1,
      itemIndex: 2,
      itemType: "스티커",
      itemImgUrl: "/assets/images/contents/tree/item/sticker/minipin.png",
      itemCount: "20",
      itemName: "강이",
      itemWidth: 60,
      itemHeight: 60,
    },
    {
      itemId: 1,
      itemIndex: 3,
      itemType: "스티커",
      itemImgUrl: "/assets/images/contents/tree/item/sticker/minipin.png",
      itemCount: "20",
      itemName: "강이",
      itemWidth: 60,
      itemHeight: 60,
    },
    {
      itemId: 1,
      itemIndex: 4,
      itemType: "스티커",
      itemImgUrl: "/assets/images/contents/tree/item/sticker/minipin.png",
      itemCount: "20",
      itemName: "강이",
      itemWidth: 60,
      itemHeight: 60,
    },
    {
      itemId: 2,
      itemIndex: 5,
      itemType: "배경",
      itemImgUrl: "/assets/images/contents/tree/item/background/snowing-night.png",
      itemCount: "20",
      itemName: "눈밤",
      itemWidth: 60,
      itemHeight: 60,
    },
    {
      itemId: 3,
      itemIndex: 6,
      itemType: "나무",
      itemImgUrl: "/assets/images/contents/tree/item/tree/cristmastree.png",
      itemCount: "20",
      itemName: "크리스마스 나무",
      itemWidth: 250,
      itemHeight: 300,
    },
  ]

  const handleClickItemCard = (index) => {
    if(selectedItemCard != index){
      setSelectedItemCard(index);
    } else{
      setSelectedItemCard(-1);
    }
  }

  return (
    <S.ItemCardListBox>
      {
        ItemsDummy.map((item, i) => (
          <S.ItemCard 
            key={i} 
            onClick={() => {handleClickItemCard(item.itemIndex)}}
            selected={item.itemIndex === selectedItemCard}
          >
            <S.ItemCardImg url={item.itemImgUrl}/>
            <S.ItemDescriptionH8>{item.itemName}</S.ItemDescriptionH8>
            <S.ItemDescriptionH8>보유 : 30</S.ItemDescriptionH8>
            {
                item.itemType == "스티커" && (
                <>
                  <S.ItemDescriptionH10>사이즈 ({item.itemWidth} X {item.itemHeight})</S.ItemDescriptionH10>
                </>
              )
            }
            
            {
              item.itemIndex === selectedItemCard && (
                <>
                  <S.ButtonWrapper>
                    <S.ItemAddButton>추가</S.ItemAddButton>
                    <S.ItemRemoveButton>제거</S.ItemRemoveButton>
                  </S.ButtonWrapper>
                </>
              )
            }
          </S.ItemCard>
        ))
      }
    </S.ItemCardListBox>
  );
};

export default MyTreeItemsAll;