import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../../context/HeaderContext';
import ConfirmModal from '../../../layout/modal/ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from '../../../../modules/member';

const CartViewModal = ({handleConfrmModal, onCancel}) => {
    const columnTitles = ["", "아이템 이름", "아이템 이미지", "개수", "개당 아이템 가격", "아이템 총 가격"]; // 마지막은 스크롤 공간용
    const [itemList, setItemList] = useState([]);
    const { lockScroll, unlockScroll } = useContext(HeaderContext);
    const [checkedItemList, setCheckedItemList] = useState([]);
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [showCartConfirmModal, setShowCartConfirmModal] = useState(false);
    const [showCartConfirmOkModal, setShowCartConfirmOkModal] = useState(false);
    
    const dispatch = useDispatch();
    const member = useSelector(state => state.member.currentUser); // 🔥 최신값 사용

    const isAllChecked = itemList.length > 0 && checkedItemList.length === itemList.length;
    const isItemChecked = (itemId) => {
        return checkedItemList.some(item => item.itemId === itemId);
    };
    const handleToggleAll = () => {
        if (checkedItemList.length === itemList.length) {
            // 전체 선택된 상태 → 전체 해제
            setCheckedItemList([]);
        } else {
            // 하나도 없거나 일부만 선택 → 전체 선택
            setCheckedItemList(itemList);
        }
    };
    const handleCheckItem = (checkedItem) => {
        setCheckedItemList((prev) => {
            const exists = prev.some(item => item.itemId === checkedItem.itemId);

            if (exists) {
                // 이미 있으면 제거
                return prev.filter(item => item.itemId !== checkedItem.itemId);
            } else {
                // 없으면 추가
                return [...prev, checkedItem];
            }
        });
    }

    
    useEffect(() => {
        if (handleConfrmModal) lockScroll();

        setBuyingPrice(checkedItemList.reduce((sum, item) => sum + item.totalPrice, 0));
        getCartItems();
        return () => unlockScroll();
    }, [member, handleConfrmModal, itemList, checkedItemList, buyingPrice, isAllChecked]);
    
    if (!handleConfrmModal) return (
        <>
        </>
    );

    const handleDeleteItem = async () => {
        checkedItemList.map(async (checkedItem) => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/cart/item/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkedItem)
            });
        })

        // 모든 삭제 요청이 완료된 이후에 수행
        await getCartItems(); // cart 갱신
        setCheckedItemList([]); // 체크 초기화
    };

    const getCartItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/cart/item-list/${member.id}`)
        
        const data = await response.json();
        setItemList(data);
    }

    
    const handleBuyItem = async () => {
        const totalPrice = checkedItemList.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/item/buy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totalPrice: totalPrice,
                buyingItems: checkedItemList,
                deleteCart: true
            })
        })
        
        // 모든 구매 요청이 완료된 이후에 수행
        await getCartItems(); // cart 갱신
        setCheckedItemList([]); // 체크 초기화
        const updatedMember = {
            ...member,
            memberPoint: member.memberPoint - totalPrice
        };
        // Redux 상태 업데이트
        dispatch(setUser(updatedMember));
        onCancel();
    };

    
    return (
        <S.ModalOverlay>
            <S.ModalContainer>
                <S.TitleContainer>
                    <S.Title>장바구니</S.Title>
                    <S.CloseButton 
                        src='/assets/images/modal/close-button.png' 
                        alt='x버튼' 
                        onClick={onCancel} />
                </S.TitleContainer>
                <S.GridContainer>
                    <S.GridHeader>
                    {columnTitles.map((title, index) => {
                        if(title === ""){
                            return (
                                <S.GridCell 
                                    key={index} 
                                    widthIndex={index} 
                                    isHeader
                                >
                                    <S.CheckBox
                                        checked={isAllChecked}
                                        onChange={handleToggleAll}
                                    />
                                </S.GridCell>
                            )
                        }else {
                            return (
                                <S.GridCell 
                                    key={index} 
                                    widthIndex={index} 
                                    isHeader
                                >
                                {title}
                                </S.GridCell>
                            )
                        }
                    })}
                    </S.GridHeader>

                    <S.GridBody>
                    {itemList.map((item, i) => (
                        <S.GridRow key={i}>
                        {columnTitles.map((column, col) => {
                            switch(column){
                                case "":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            <S.CheckBox 
                                                checked={isItemChecked(item.itemId)}
                                                onChange={() => handleCheckItem(item)}
                                            />
                                        </S.GridCell>
                                    )
                                case "아이템 이름":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            {item.itemName}
                                        </S.GridCell>
                                    )
                                case "아이템 이미지":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            <img 
                                                width={'80px'}
                                                height={'80px'}
                                                src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${item.itemImgPath}&fileName=${item.itemImgName}`}
                                            />
                                        </S.GridCell>
                                    )
                                case "개수":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            {item.buyItemCount}
                                        </S.GridCell>
                                    )
                                case "개당 아이템 가격":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            {item.itemPrice}
                                        </S.GridCell>
                                    )
                                case "아이템 총 가격":
                                    return (
                                        <S.GridCell widthIndex={col}>
                                            {item.totalPrice}
                                        </S.GridCell>
                                    )
                            }
                        })}
                        </S.GridRow>
                    ))}
                    </S.GridBody>
                </S.GridContainer>
                <S.CartInfoContainer>
                    <S.CartButton
                        background={'#FF3F3F'} 
                        onClick={handleDeleteItem}
                        hoverBackground={'#FF4E00'}>
                        선택 아이템 삭제
                    </S.CartButton>
                    <S.InfoTitleText>총   <S.DescriptionPoint>4 </S.DescriptionPoint> 건</S.InfoTitleText>
                    <S.PointInfoWrapper>
                        <S.InfoDescText>보유 포인트 : <S.DescriptionPoint>{member.memberPoint}</S.DescriptionPoint> 🪙</S.InfoDescText>
                        <S.InfoDescText>- 총 금액 : <S.DescriptionPoint>{buyingPrice}</S.DescriptionPoint> 🪙</S.InfoDescText>
                        <S.InfoDescText style={{borderTop:'1px solid #000'}}>남는 포인트 : <S.DescriptionPoint>{member.memberPoint - buyingPrice}</S.DescriptionPoint> 🪙</S.InfoDescText>
                    </S.PointInfoWrapper>
                    <S.CartButton 
                        background={'#009DCC'} 
                        onClick={handleBuyItem}
                        hoverBackground={'#009DFF'}>
                        구매
                    </S.CartButton>
                </S.CartInfoContainer>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
};

export default CartViewModal;