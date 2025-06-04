import React, { useEffect, useState } from 'react';
import S from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';

const PointShop = ({
    member,
    memberPoint,
    cartShow, 
    setCartShow, 
    selectItems, 
    setSelectItems, 
    cartAddResultMsg, 
    setCartAddResultMsg, 
    showAlertModal, 
    setShowAlertModal
}) => {
    const handleCancel = (itemId) => {
        setSelectItems((prev) => {
            const updated = { ...prev };
            delete updated[itemId];  // 해당 itemId에 해당하는 객체 제거
            return updated;
        });
    }

    const handleAddAllToCart = async () => {
        const selectedList = Object.values(selectItems).filter(item => item.buyItemCount > 0);
        let resultMsg = "";

        if (selectedList.length === 0) {
            resultMsg = "담을 아이템이 없습니다.";
            setShowAlertModal(true);
            setCartAddResultMsg(resultMsg);
            return;
        }

        const cleanedItems = Object.values(selectItems)
        .filter(item => item !== null && item !== undefined && item.buyItemCount > 0);

        const payloadItems = cleanedItems.map((item, i) => ({
            ...item,  // 기존 속성 유지
            id: i,
            totalPrice: item.itemPrice * item.buyItemCount  // 🔥 계산해서 추가
        }));

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/cart/item/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadItems)
            });

            const result = await response.json();
            resultMsg = result.message;
        } catch (error) {
            resultMsg = error;
        }

        setShowAlertModal(true);
        setCartAddResultMsg(resultMsg);
        setSelectItems({});
    };

    return (
        <>
            <S.SubTitle>마음에 드는 아이템을 골라보세요 👁️</S.SubTitle>
            <S.MainTitle>포인트 샵 💸</S.MainTitle>
            <S.PointShopInfoContainer>
                <S.MemberInfoWrapper>
                    <S.InfoTitleText>{member.memberNickName} 님</S.InfoTitleText>
                    <S.InfoDescText>보유 포인트 : <S.DescriptionPoint>{memberPoint}</S.DescriptionPoint> 🪙 </S.InfoDescText>
                    <S.Link to={`/main/mypage/${member.id}/point-log`}>포인트 이용내역 확인하기</S.Link>
                </S.MemberInfoWrapper>
                <S.CartButtonWrapper>
                    <S.ShowCartButton onClick={ () => setCartShow(true) }>장바구니 보기</S.ShowCartButton>
                    <S.CartAddAllButton onClick={handleAddAllToCart}>선택 아이템<br />모두담기</S.CartAddAllButton>
                </S.CartButtonWrapper>
                <S.SelectedItemInfoWrapper>
                    <S.InfoTitleText style={{marginTop:'10px'}}>선택 아이템 목록</S.InfoTitleText>
                    <div style={{position:'relative', display:'flex', width:'100%'}}>
                        <S.PrevButton className="custom-prev" />
                        <S.SelectedItemList
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".custom-prev",
                                nextEl: ".custom-next",
                            }}
                            spaceBetween={35}  // 🔹 슬라이드 사이 간격
                            slidesPerView='auto'
                            grabCursor={true}
                        >
                            {
                                selectItems && Object.values(selectItems).map((selectItem) => (
                                    <S.SelectItemInfo>
                                        <S.SelectItemCancelButton onClick={() => handleCancel(selectItem.itemId)} />
                                        <S.SelectItemCard>
                                            <img 
                                                width={'40px'} 
                                                height={'40px'} 
                                                src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${selectItem.itemImgPath}&fileName=${selectItem.itemImgName}`}
                                            />
                                            <S.SelectItemCount>{selectItem.buyItemCount}</S.SelectItemCount>
                                        </S.SelectItemCard>
                                        <S.InfoDescText>{selectItem.itemName}</S.InfoDescText>
                                    </S.SelectItemInfo>
                                ))
                            }
                        </S.SelectedItemList>
                        <S.NextButton className="custom-next" />
                    </div>
                </S.SelectedItemInfoWrapper>
            </S.PointShopInfoContainer>
        </>
    );
};

export default PointShop;