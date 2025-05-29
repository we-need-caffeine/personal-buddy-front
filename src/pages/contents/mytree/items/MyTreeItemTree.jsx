import React, { useEffect, useState } from 'react';
import S from '../style';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const MyTreeItemTree = () => {
  const {
    memberId,
    memberItems,
    setMemberItems,
    memberAppliedItemsSticker,
    setMemberAppliedItemSticker, 
    memberAppliedItemBackground,
    setMemberAppliedItemBackground, 
    memberAppliedItemTree,
    setMemberAppliedItemTree,
    memberCustomizingList, 
    setMemberCustomizingList
  } = useOutletContext();

  const [selectedItemCard, setSelectedItemCard] = useState(-1);

  const handleClickItemCard = (index) => {
    if(selectedItemCard != index){
      setSelectedItemCard(index);
    } else{
      setSelectedItemCard(-1);
    }
  }

  const handleAddClick = (itemId, itemType) => {
    const sameTypeItems = memberCustomizingList.filter((item) => item.itemType === itemType);
  
    const removeItem = sameTypeItems.filter((item) => item.itemType === itemType && item.treeCustomizingApply === 1)[0];
    const addItem =  sameTypeItems.filter((item) => item.itemId === itemId)[0];
    
    addItem.treeCustomizingApply = 1;

    if(removeItem){
      removeItem.treeCustomizingApply = 0;
    }

    setMemberAppliedItemTree(addItem);
    setMemberItems(prev =>
      prev.map(item =>
        item.itemId === addItem.itemId
          ? {
              ...item,
              notAppliedCount: item.notAppliedCount - 1,
              appliedCount: item.appliedCount + 1
            }
          : 
        removeItem && item.itemId === removeItem.itemId
          ? {
            ...item,
            notAppliedCount: item.notAppliedCount + 1,
            appliedCount: item.appliedCount - 1
          }
          :
          item
      )
    );
    
  }

  const handleRemoveClick = (itemId, itemType) => {
    const sameTypeItems = memberCustomizingList.filter((item) => item.itemType === itemType);
    const removeItem = sameTypeItems.filter(item => item.itemType === itemType && item.treeCustomizingApply === 1)[0];
    removeItem.treeCustomizingApply = 0;
    setMemberAppliedItemTree(null);
    setMemberItems(prev =>
      prev.map(item =>
        item.itemId === removeItem.itemId
          ? {
              ...item,
              notAppliedCount: item.notAppliedCount + 1,
              appliedCount: item.appliedCount - 1
            }
          : item
      )
    );
  }


  return (
    <S.ItemCardListBox>
      {
        memberItems && memberItems.filter(item => item.itemType === "나무")
          .map((item) => (
          <S.ItemCard 
            key={item.itemId} 
            onClick={() => {handleClickItemCard(item.itemId)}}
            selected={item.itemId === selectedItemCard}
            appliedCount={item.appliedCount}
            notAppliedCount={item.notAppliedCount}
          >
            <S.ItemCardImg 
              url={
                item.itemImgPath && item.itemImgName
                  ? 
                  `${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${item.itemImgPath}&fileName=${item.itemImgName}`
                  : 
                  ""
                }
            />
            <S.ItemDescriptionH8>{item.itemName}</S.ItemDescriptionH8>
            {
              item.itemId === selectedItemCard && (
                <>
                  <S.ButtonWrapper>
                    {
                      item.notAppliedCount !== 0 && (
                        <S.ItemAddButton onClick={() => handleAddClick(item.itemId, item.itemType)}>추가</S.ItemAddButton>
                      )
                    }
                    {
                      item.totalCount != item.notAppliedCount && (
                        <S.ItemRemoveButton onClick={() => handleRemoveClick(item.itemId, item.itemType)}>제거</S.ItemRemoveButton>
                      )
                    }
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

export default MyTreeItemTree; 