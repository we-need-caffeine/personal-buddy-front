import React, { useEffect, useState } from 'react';
import S from '../style';
import Pagination from '../../../../hooks/pagenation/Pagination';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../../../modules/member';

const PointShopItemSticker = () => {
    const dispatch = useDispatch(); 
    const member = useSelector(state => state.member.currentUser);
    const { selectItems } = useOutletContext();
    const { setSelectItems } = useOutletContext();
    const { modal } = useOutletContext();
    const { setModal } = useOutletContext();
    const memberId = member.id;
    const [items, setItems] = useState([]);
    const [selectedItemCard, setSelectedItemCard] = useState(-1);
    
    // 아이템 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedItems = items.filter(item => item.itemType === "스티커").slice(
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
            itemType: item.itemType,
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

        const currentCount = prev[item.itemId]?.buyItemCount || 0;
        // 1 감소 시 0 이하면 삭제
        if ((currentCount - 1) <= 0) {
            const updated = { ...prev };
            delete updated[item.itemId];  // 해당 itemId 제거
            return updated;
        }

        return {
            ...prev,
            [item.itemId]: {
            id: null,
            itemId: item.itemId,
            memberId: member.id,
            itemName: item.itemName,
            itemType: item.itemType,
            itemImgPath: item.itemImgPath,
            itemImgName: item.itemImgName,
            buyItemCount: (prev[item.itemId]?.buyItemCount || 0) - 1,
            itemPrice: item.itemPrice,
            }
        }
        });
    };

    const itemBuy = async (item) => {
        const params = {
        buyingItems: [
            {
            id: null,
            itemId: item.itemId,
            memberId: member.id,
            itemName: item.itemName,
            itemType: item.itemType,
            itemImgPath: item.itemImgPath,
            itemImgName: item.itemImgName,
            buyItemCount: 1,
            itemPrice: item.itemPrice,
            }
        ],
        totalPrice: item.itemPrice,
        deleteCart: false
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/item/buy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        
        // 모든 구매 요청이 완료된 이후에 수행
        const updatedMember = {
            ...member,
            memberPoint: member.memberPoint - params.totalPrice
        };
        // Redux 상태 업데이트
        dispatch(setUser(updatedMember));
        setModal((modal) => ({
        showModal: true, 
        modalTitleMsg: "아이템 구매",
        modalDescriptionMsg: "아이템 구매 완료",
        modalCancelBtnMsg: "확인",
        }))
    }

    const handleItemBuy = (e, item) => {
        e.stopPropagation();
        setModal((modal) => ({
        showModal: true, 
        modalTitleMsg: "아이템 구매",
        modalDescriptionMsg: "선택한 아이템을 구매하시겠습니까?",
        onConfirm: () => itemBuy(item),
        modalOkBtnMsg: "구매",
        modalCancelBtnMsg: "취소",
        }))
    };

    const itemAddCart = async (item) => {
        let resultMsg = "";

        const buyingItems = [{
            id: null,
            itemId: item.itemId,
            memberId: member.id,
            itemName: item.itemName,
            itemType: item.itemType,
            itemImgPath: item.itemImgPath,
            itemImgName: item.itemImgName,
            buyItemCount: 1,
            itemPrice: item.itemPrice,
        }]
        try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/cart/item/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buyingItems)
        });

        const result = await response.json();
        resultMsg = result.message;
        } catch (error) {
            resultMsg = error;
        }
        setModal((modal) => ({
            showModal: true, 
            modalTitleMsg: "장바구니 담기",
            modalDescriptionMsg: resultMsg,
            modalOkBtnMsg: "",
            modalCancelBtnMsg: "확인",
        }))
    }

    const handleItemAddCart = (e, item) => {
        e.stopPropagation();
        setModal((modal) => ({
        showModal: true, 
        modalTitleMsg: "장바구니 담기",
        modalDescriptionMsg: "선택한 아이템을 장바구니에 담겠습니까?",
        onConfirm: () => itemAddCart(item),
        modalOkBtnMsg: "담기",
        modalCancelBtnMsg: "취소",
        }))
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
                        <S.ItemBuyButton onClick={(e) => handleItemBuy(e, item)}>구매</S.ItemBuyButton>
                        <S.ItemCartAddButton onClick={(e) => handleItemAddCart(e, item)}>담기</S.ItemCartAddButton>
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
            totalPages={Math.ceil(items.filter(item => item.itemType === "스티커").length / 24)}
            onPageChange={setCurrentPage}
            />
        </S.PaginationWrapper>
        </S.ItemCardListBox>
    );
};

export default PointShopItemSticker;