import React, { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../../../../context/HeaderContext';
import S from './style';
import CheckPhoneModal from './CheckPhoneModal';

const PhoneModal = ({currentUser, handlePhoneModal, onCancel}) => {

  const [viewCheckPhoneModal, setViewCheckPhoneModal] = useState(false)

  const [phoneNum, setPhoneNum] = useState('')
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(null);
  const [phoneCheckError, setPhoneCheckError] = useState('');
  const phoneRegex = /^010\d{8}$/;

  const handleChangePhoneNum = (e) => {
    const value = e.target.value;
    setPhoneNum(value);
    setIsPhoneNumValid(phoneRegex.test(value));
  };

  const handleConfirmClick = async () => {
    if (!isPhoneNumValid) return;
    
    try {
      const response = await fetch(`http://localhost:10000/members/api/phone/check?phone=${phoneNum}`);
      const data = await response.json();

      if (data === true) {
        setPhoneCheckError('이미 등록된 전화번호입니다.');
        console.log("있어");
      } else {
        console.log("없어");
        setPhoneCheckError('');
        setViewCheckPhoneModal(true);
      }
    } catch (error) {
      console.error(error);
      setPhoneCheckError('전화번호 확인 중 오류가 발생했습니다.');
    }
  };

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);
  
  useEffect(() => {
    if (handlePhoneModal) lockScroll();
    return () => unlockScroll();
  }, [handlePhoneModal]);
  
  if (!handlePhoneModal) return (
    <>
    </>
  );

  return (
    <div>
      <S.Backdrop onClick={onCancel}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.TitleContainer>
            <S.Title>전화번호 변경</S.Title>
            <S.CloseButton 
              src='/assets/images/modal/close-button.png' 
              alt='x버튼' 
              onClick={onCancel} 
            />
          </S.TitleContainer>
          <S.ContentContainer>
            <div>변경할 전화번호를 입력해 주세요.</div>
            <S.InputContainer>
              <S.MemberInfoInput 
                placeholder="ex) 01012345678"
                value={phoneNum}
                onChange={handleChangePhoneNum}
              />
            </S.InputContainer>
            {(isPhoneNumValid === false || phoneCheckError) && (
              <S.ErrorMessage>
                {isPhoneNumValid === false 
                  ? '올바르지 않은 형식의 전화번호입니다.'
                  : phoneCheckError}
              </S.ErrorMessage>
            )}
          </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={handleConfirmClick}
              disabled={!isPhoneNumValid}
            >
              확인
            </S.ConfirmButton>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.ModalContainer>
      </S.Backdrop>

      {/* 전화번호 인증 모달 */}
      {viewCheckPhoneModal && (
        <CheckPhoneModal
          currentUser={currentUser}
          phoneNum={phoneNum}
          handleCheckPhoneModal={viewCheckPhoneModal}
          onCancel={() => setViewCheckPhoneModal(false)}
          outModal={() => {
            onCancel()
            setViewCheckPhoneModal(false)
          }}
        />
      )}
    </div>
  );
};

export default PhoneModal;