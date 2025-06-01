import React, { useContext, useEffect, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../../context/HeaderContext';

const CheckPasswordModal = ({memberId, handleCheckPasswordModal, onCancel, outModal}) => {

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isMatched, setIsMatched] = useState(null);

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setIsValid(passwordRegex.test(value));
    setIsMatched(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsMatched(value === newPassword);
  };

  const handlePasswordUpdate = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mypages/api/member/update-password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          id: memberId,
          memberPassword: newPassword
        })
      });

      if (res.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        outModal();
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("에러가 발생했습니다.");
    }
  };

  // 헤더 스크롤을 막는 함수
  useEffect(() => {
    if (handleCheckPasswordModal) lockScroll();
    return () => unlockScroll();
  }, [handleCheckPasswordModal]);
  
  if (!handleCheckPasswordModal) return (
    <>
    </>
  );

  return (
    <div>
      <S.BackdropNone>
        <S.DoubleModalContainer onClick={(e) => e.stopPropagation()}>
          <S.TitleContainer>
            <S.Title>비밀번호 변경</S.Title>
            <S.CloseButton 
              src='/assets/images/modal/close-button.png' 
              alt='x버튼' 
              onClick={onCancel} 
            />
          </S.TitleContainer>
          <S.DoubleContentContainer>
            <div>
              <div>새로운 비밀번호를 입력해주세요.</div>
              <S.InputContainer>
                <S.MemberInfoInput
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </S.InputContainer>
              <S.ErrorMessage className={isValid === false ? "visible" : "hidden"}>
                8자 이상, 소문자, 숫자, 특수문자(!@#)를 포함해야 합니다.
              </S.ErrorMessage>
            </div>
            <div>
              <div>비밀번호를 다시 입력해주세요.</div>
              <S.InputContainer>
                <S.MemberInfoInput
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </S.InputContainer>
              <S.ErrorMessage className={isMatched === false ? "visible" : "hidden"}>
                비밀번호가 일치하지 않습니다.
              </S.ErrorMessage>
            </div>
          </S.DoubleContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={handlePasswordUpdate}
              disabled={!isValid || !isMatched}
            >
              확인
            </S.ConfirmButton>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.DoubleModalContainer>
      </S.BackdropNone>
    </div>
  );
};

export default CheckPasswordModal;