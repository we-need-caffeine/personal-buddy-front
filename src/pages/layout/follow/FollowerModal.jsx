import React from 'react';
import S from './style';

const followerModal = () => {
  return (
    <>
      <S.Backdrop>
        <S.ModalContainer>
            <S.TitleContainer>
              <S.Title></S.Title>
              <S.CloseButton src='/assets/images/modal/close-button.png' alt='x버튼'/>
            </S.TitleContainer>
            <S.ContentContainer>
              <p></p>
            </S.ContentContainer>
            <S.ButtonContainer>
              <S.ConfirmButton>등록</S.ConfirmButton>
              <S.CancelButton>취소</S.CancelButton>
            </S.ButtonContainer>
        </S.ModalContainer>
    </S.Backdrop>
    </>
  );
};

export default followerModal;