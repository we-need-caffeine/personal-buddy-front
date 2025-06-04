import React, { useContext, useEffect } from 'react';
import S from './style';
import { HeaderContext } from '../../../context/HeaderContext';

const ConfirmDeleteModal = ({handleConfrmDeleteModal, onCancel, title, message, onConfirmDelete}) => {

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  useEffect(() => {
    if (handleConfrmDeleteModal) lockScroll();

    // ESC 키 핸들러
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    // 모달이 열릴 때만 리스너 등록
    if (handleConfrmDeleteModal) {
        window.addEventListener('keydown', handleEsc);
    }

    // 모달 닫힐 때 리스너 해제
    return () => {
        unlockScroll();
        window.removeEventListener('keydown', handleEsc);
    };
  }, [handleConfrmDeleteModal, onCancel]);

  if (!handleConfrmDeleteModal) return null;

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
          <S.CancelButton onClick={onCancel}>
            취소
          </S.CancelButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.Backdrop>
  );
};

export default ConfirmDeleteModal;