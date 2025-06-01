import React, { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../../../../context/HeaderContext';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import S from './style';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../modules/member';

const BrithModal = ({currentUser, handleBrithModal, onCancel}) => {
  
  const memberId = currentUser.id;
  const dispatch = useDispatch();
  const [birth, setBirth] = useState('');
  const [birthValidation, setBirthValidation] = useState(null);
  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  const updateBirth = async() => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/update`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        id: memberId,
        memberBirth: birth
      })
    });
    if (response.ok) {
      alert('생년월일 변경 성공')
      onCancel()
        dispatch(setUser({
          ...currentUser,
          memberBirth : birth
        }))
    } else {
      alert('생년월일 변경 실패')
    }
  }

  useEffect(() => {
      if (handleBrithModal) lockScroll();
      return () => unlockScroll();
  }, [handleBrithModal]);
  
  if (!handleBrithModal) return (
      <>
      </>
  );

  return (
    <div>
      <S.Backdrop onClick={onCancel}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.TitleContainer>
            <S.Title>생년월일 변경</S.Title>
            <S.CloseButton 
              src='/assets/images/modal/close-button.png' 
              alt='x버튼' 
              onClick={onCancel}
            />
          </S.TitleContainer>
          <S.ContentContainer>
            <div>변경할 생년월일을 선택해 주세요.</div>
            <S.BirthInputWrapper validationState={birthValidation}>
              <Flatpickr
                options={{ dateFormat: 'Y-m-d' }}
                value={birth}
                onOpen={() => {
                  // 사용자 interaction 감지
                  setBirthValidation(birth ? true : false);
                }}
                onChange={([date]) => {
                  setBirth(date);
                  setBirthValidation(date ? true : false);
                }}
                render={({ render, defaultValue, value, ...props }, ref) => (
                  <S.Input {...props} ref={ref} placeholder="생년월일 선택" />
                )}
              />
            </S.BirthInputWrapper>
          </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={updateBirth}
              disabled={!birthValidation}
            >
              변경
            </S.ConfirmButton>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.ModalContainer>
      </S.Backdrop>
    </div>
  );
};

export default BrithModal;