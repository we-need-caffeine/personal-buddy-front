import React, { useEffect, useState } from 'react';
import S from '../style';
import { useSelector } from 'react-redux';

const MyTreeItemsAll = () => {


  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;

  const [selectedItemCard, setSelectedItemCard] = useState(-1);
  const [memberItems, setMemberItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/my-tree/api/tree/list`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "memberId": memberId,
          "itemType": null
        })
        
      })

      const data = await response.json();
      
      const memberItems = data.memberTreeItemList;
      setMemberItems(memberItems);
    }


    getItems();
  }, [memberId]);

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
        memberItems.map((item, i) => (
          <S.ItemCard 
            key={i} 
            onClick={() => {handleClickItemCard(i)}}
            selected={i === selectedItemCard}
            appliedCount={item.appliedCount}
            notAppliedCount={item.notAppliedCount}
          >
            <S.ItemCardImg url={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${item.itemImgPath}&fileName=${item.itemImgName}`}/>
            <S.ItemDescriptionH8>{item.itemName}</S.ItemDescriptionH8>
            {
                item.itemType == "스티커" && (
                <>
                  <S.ItemDescriptionH8>남은 개수 : {item.notAppliedCount}</S.ItemDescriptionH8>
                  <S.ItemDescriptionH10>사이즈 ({item.itemSizeWidth} X {item.itemSizeHeight})</S.ItemDescriptionH10>
                </>
              )
            }
            
            {
              i === selectedItemCard && (
                <>
                  <S.ButtonWrapper>
                    {
                      item.notAppliedCount != 0 && (
                        <S.ItemAddButton>추가</S.ItemAddButton>
                      )
                    }
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