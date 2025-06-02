import React, { useEffect, useState } from 'react';
import S from '../style';
import Pagination from '../../../../hooks/pagenation/Pagination';
import { useOutletContext } from 'react-router-dom';

const PointShopItemsAll = () => {

  const { member } = useOutletContext();
  const { selectItems } = useOutletContext();
  const { setSelectItems } = useOutletContext();
  const memberId = member.id;
  const [items, setItems] = useState([]);
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

  const handleItemCountIncrease = (e, item) => {
    e.stopPropagation();
    setSelectItems((prev) => {
      if((item.itemType === "배경" || item.itemType === "나무")
        && (prev[item.itemId]?.buyItemCount || 0) + 1 > 1){
          return prev;
      }
      
      return {
        ...prev,
        [item.itemId]: {
          id: null,
          itemId: item.itemId,
          memberId: member.id,
          itemName: item.itemName,
          itemImgPath: item.itemImgPath,
          itemImgName: item.itemImgName,
          buyItemCount: (prev[item.itemId]?.buyItemCount || 0) + 1,
          itemPrice: item.itemPrice,
        }
      }
    });
  };

  const handleItemCountDecrease = (e, item) => {
    e.stopPropagation();
    setSelectItems((prev) => {
      if(((prev[item.itemId]?.buyItemCount || 0) - 1) <= 0){
        return prev.filter(prevItem => prevItem.itemId !== item.itemId);
      }
      
      return {
        ...prev,
        [item.itemId]: {
          id: null,
          itemId: item.itemId,
          memberId: member.id,
          itemName: item.itemName,
          itemImgPath: item.itemImgPath,
          itemImgName: item.itemImgName,
          buyItemCount: (prev[item.itemId]?.buyItemCount || 0) - 1,
          itemPrice: item.itemPrice,
        }
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
            selected={(item.itemId === selectedItemCard || (selectItems[item.itemId]?.buyItemCount || 0) !== 0)}
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
                (selectItems[item.itemId]?.buyItemCount || 0) !== 0) &&
                !((item.itemType === "나무" || item.itemType === "배경") && item.itemOwned === 1) && (
                <S.ItemInfoWrapper>
                  <S.ItemCountWrapper>
                    <S.ItemCountButton onClick={(e) => handleItemCountDecrease(e, item)}>-</S.ItemCountButton>
                    <S.ItemDescriptionH10>{selectItems[item.itemId]?.buyItemCount || 0}</S.ItemDescriptionH10>
                    <S.ItemCountButton onClick={(e) => handleItemCountIncrease(e, item)}>+</S.ItemCountButton>
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