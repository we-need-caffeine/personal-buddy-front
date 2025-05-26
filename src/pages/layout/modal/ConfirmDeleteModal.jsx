import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const ConfirmDeleteModal = ({handleConfrmDeleteModal, onCancel, title, message, onConfirmDelete}) => {

  // 헤더 스크롤을 막는 상태
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  useEffect(() => {
      if (handleConfrmDeleteModal) lockScroll();
      return () => unlockScroll();
  }, [handleConfrmDeleteModal]);

  if (!handleConfrmDeleteModal) return (
    <>
    </>
  );

  return (
    <S.Backdrop onClick={onCancel}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.TitleContainer $handleConfrmDeleteModal={handleConfrmDeleteModal}>
          <S.Title>{title}</S.Title>
          <S.CloseButton 
            src='/assets/images/modal/close-button.png' 
            alt='x버튼' 
            onClick={onCancel}
          />
        </S.TitleContainer>
        <S.ContentContainer>
          <p>{message}</p>
        </S.ContentContainer>
        <S.ButtonContainer>
          <S.ConfirmButton
            $handleConfrmDeleteModal={handleConfrmDeleteModal}
            onClick={onConfirmDelete}
          >
            삭제
          </S.ConfirmButton>
          <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.Backdrop>
  );
};

export default ConfirmDeleteModal;