import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../../context/HeaderContext';

const CartViewModal = ({handleConfrmModal, memberId, onCancel}) => {
    const columnTitles = ["", "아이템 이름", "아이템 이미지", "개수", "개당 아이템 가격", "아이템 총 가격"]; // 마지막은 스크롤 공간용
    const dataList = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 임시 데이터

    const { lockScroll, unlockScroll } = useContext(HeaderContext);
    
    useEffect(() => {
        if (handleConfrmModal) lockScroll();

        const getCartItems = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/point-shop/api/cart/item-list/${memberId}`)
            .then(res => {
                if(res.ok)
                    return res;
            })
            .then(data => {
                console.log(data);
            })
        }

        getCartItems();
        return () => unlockScroll();
    }, [handleConfrmModal]);
    
    if (!handleConfrmModal) return (
        <>
        </>
    );
    
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
                    {columnTitles.map((title, index) => (
                        <S.GridCell 
                            key={index} 
                            widthIndex={index} 
                            isHeader
                        >
                            {title}
                        </S.GridCell>
                    ))}
                    </S.GridHeader>

                    <S.GridBody>
                    {dataList.map((data, rowIdx) => (
                        <S.GridRow key={rowIdx}>
                        {columnTitles.map((_, colIdx) => (
                            <S.GridCell key={colIdx} widthIndex={colIdx}>
                                데이터 {rowIdx + 1}-{colIdx + 1}
                            </S.GridCell>
                        ))}
                        </S.GridRow>
                    ))}
                    </S.GridBody>
                </S.GridContainer>
                <S.CartInfoContainer>
                    <S.CartButton
                        background={'#FF3F3F'} 
                        hoverBackground={'#FF4E00'}>
                        선택 아이템 삭제
                    </S.CartButton>
                    <S.InfoTitleText>총   <S.DescriptionPoint>4 </S.DescriptionPoint> 건</S.InfoTitleText>
                    <S.PointInfoWrapper>
                        <S.InfoDescText>보유 포인트 : <S.DescriptionPoint>10000</S.DescriptionPoint> 🪙</S.InfoDescText>
                        <S.InfoDescText>- 총 금액 : <S.DescriptionPoint>1000</S.DescriptionPoint> 🪙</S.InfoDescText>
                        <S.InfoDescText style={{borderTop:'1px solid #000'}}>남는 포인트 : <S.DescriptionPoint>9000</S.DescriptionPoint> 🪙</S.InfoDescText>
                    </S.PointInfoWrapper>
                    <S.CartButton 
                        background={'#009DCC'} 
                        hoverBackground={'#009DFF'}>
                        구매
                    </S.CartButton>
                </S.CartInfoContainer>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
};

export default CartViewModal;