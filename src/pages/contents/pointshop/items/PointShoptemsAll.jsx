import React, { useEffect, useState } from 'react';
import S from '../style';
import Pagination from '../../../../hooks/pagenation/Pagination';

const PointShopItemsAll = () => {

  const [items, setItems] = useState([]);
  const [selectedItemCard, setSelectedItemCard] = useState(-1);
  
  // 아이템 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = items.slice(
    (currentPage - 1) * 24,
    currentPage * 24
  );
  
  const handleClickItemCard = (index) => {
    if(selectedItemCard != index){
      setSelectedItemCard(index);
    } else{
      setSelectedItemCard(-1);
    }
  }

  useEffect(() => {
    const getItemList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/item/list/all`)
      const data = await response.json();
      setItems(data);
    }
    getItemList();
  }, [])

  return (
    <S.ItemCardListBox>
      {
        paginatedItems && paginatedItems.map((item) => (
          <S.ItemCard 
            key={item.id} 
            onClick={() => {handleClickItemCard(item.id)}}
            selected={item.id === selectedItemCard}
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