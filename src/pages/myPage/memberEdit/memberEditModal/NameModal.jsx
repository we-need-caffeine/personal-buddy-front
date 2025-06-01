import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../modules/member';
import { HeaderContext } from '../../../../context/HeaderContext';
import S from './style';

const NameModal = ({currentUser, handleNameModal, onCancel}) => {

  const memberId = currentUser.id;
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [isNameValid, setIsNameValid] = useState(null);

  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
    setIsNameValid(/^[가-힣a-zA-Z]{2,10}$/.test(value));
  };

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  const updateName = async() => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/update`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          id: memberId,
          memberName: name
        })
      });
      if (response.ok) {
        alert('이름 변경 성공')
        onCancel()
          dispatch(setUser({
            ...currentUser,
            memberName : name
          }))
      } else {
        alert('이름 변경 실패')
      }
    }

    useEffect(() => {
      if (handleNameModal) lockScroll();
      return () => unlockScroll();
    }, [handleNameModal]);
    
    if (!handleNameModal) return (
      <>
      </>
    );

  return (
    <div>
      <S.Backdrop onClick={onCancel}>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.TitleContainer>
            <S.Title>이름 변경</S.Title>
            <S.CloseButton 
              src='/assets/images/modal/close-button.png' 
              alt='x버튼' 
              onClick={onCancel} 
            />
          </S.TitleContainer>
          <S.ContentContainer>
            <div>변경할 이름을 입력해 주세요.</div>
            <S.InputContainer>
              <S.MemberInfoInput 
                placeholder="이름 입력"
                value={name}
                onChange={handleChangeName}
              />
            </S.InputContainer>
            {isNameValid === false && 
              <S.ErrorMessage>
                이름은 2~10자의 한글 또는 영문이어야 합니다.
              </S.ErrorMessage>
            }
          </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={updateName}
              disabled={!isNameValid}
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

export default NameModal;