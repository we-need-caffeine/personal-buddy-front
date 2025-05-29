import React, { useEffect, useState } from 'react';
import S from '../style';
import Pagination from '../../../../hooks/pagenation/Pagination';
import { useOutletContext } from 'react-router-dom';

const PointShopItemsAll = () => {

  const { member } = useOutletContext();
  const memberId = member.id;
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState({});
  const [selectedItemCard, setSelectedItemCard] = useState(-1);
  
  // 아이템 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = items.slice(
    (currentPage - 1) * 24,
    currentPage * 24
  );
  
  const handleClickItemCard = (index) => {
    if(selectedItemCard !== index){
      setSelectedItemCard(index);
    } else{
      setSelectedItemCard(-1);
    }
  }

  const handleItemCountIncrease = (e, itemId, itemType) => {
    e.stopPropagation();
    setItemCount((prev) => {
      if((itemType === "배경" || itemType === "나무")
        && (prev[itemId] || 0) + 1 > 1){
          return prev;
      }
      return {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }
    });
  };

  const handleItemCountDecrease = (e, itemId) => {
    e.stopPropagation();
    
    setItemCount((prev) => {
      if(((prev[itemId] || 0) - 1) < 0){
        return prev;
      }

      return {
        ...prev,
        [itemId]: (prev[itemId] || 0) - 1
      }
    });
  };

  useEffect(() => {
    if(memberId === 0) {
      return;
    }

    const getItemList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/item/list`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: memberId,
          itemType: null,
        })
      })
      const data = await response.json();
      console.log("응답 데이터 : ", data);
      setItems(data);
      
    }
    getItemList();
  }, [memberId, currentPage])

  return (
    <S.ItemCardListBox>
      {
        paginatedItems.length !== 0 && paginatedItems.map((item) => (
          <S.ItemCard 
            key={item.itemId} 
            itemData={item}
            onClick={() => {handleClickItemCard(item.itemId)}}
            selected={(item.itemId === selectedItemCard || (itemCount[item.itemId] || 0) !== 0)}
            isOwned={(item.itemType === "나무" || item.itemType === "배경") && item.itemOwned === 1}
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
            <S.ItemDescriptionH10>가격 : {item.itemPrice} 🪙</S.ItemDescriptionH10>
            {
              (item.itemId === selectedItemCard || 
                (itemCount[item.itemId] || 0) !== 0) &&
                !((item.itemType === "나무" || item.itemType === "배경") && item.itemOwned === 1) && (
                <S.ItemInfoWrapper>
                  <S.ItemCountWrapper>
                    <S.ItemCountButton onClick={(e) => handleItemCountDecrease(e, item.itemId)}>-</S.ItemCountButton>
                    <S.ItemDescriptionH10>{itemCount[item.itemId] || 0}</S.ItemDescriptionH10>
                    <S.ItemCountButton onClick={(e) => handleItemCountIncrease(e, item.itemId, item.itemType)}>+</S.ItemCountButton>
                  </S.ItemCountWrapper>
                  <S.ItemCardButtonWrapper>
                    <S.ItemBuyButton>구매</S.ItemBuyButton>
                    <S.ItemCartAddButton>담기</S.ItemCartAddButton>
                  </S.ItemCardButtonWrapper>
                  <S.ItemPreviewButton>미리보기</S.ItemPreviewButton>
                </S.ItemInfoWrapper>
              )
            }
          </S.ItemCard>
        ))
      }
      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(items.length / 24)}
          onPageChange={setCurrentPage}
        />
      </S.PaginationWrapper>
    </S.ItemCardListBox>
  );
};

export default PointShopItemsAll;