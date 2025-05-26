import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const ConfirmModal = ({ handleConfrmModal, title, message, onConfirm, onCancel }) => {


    // 외부 요소 스크롤을 막는 함수
    const { lockScroll, unlockScroll } = useContext(HeaderContext);

    useEffect(() => {
        if (handleConfrmModal) lockScroll();
        return () => unlockScroll();
    }, [handleConfrmModal]);
    
    if (!handleConfrmModal) return (
        <>
        </>
    );

    return (
        <S.Backdrop onClick={onCancel}>
            <S.ModalContainer onClick={(e) => e.stopPropagation()}>
                <S.TitleContainer>
                    <S.Title>{title}</S.Title>
                    <S.CloseButton 
                        src='/assets/images/modal/close-button.png' 
                        alt='x버튼' 
                        onClick={onCancel} />
                </S.TitleContainer>
                <S.ContentContainer>
                    <p>{message}</p>
                </S.ContentContainer>
                <S.ButtonContainer>
                    <S.ConfirmButton onClick={onConfirm}>등록</S.ConfirmButton>
                    <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
                </S.ButtonContainer>
            </S.ModalContainer>
        </S.Backdrop>
    );
};

export default ConfirmModal;