import React, { useContext, useEffect, useRef, useState } from 'react';
import S from './style';
import { HeaderContext } from '../../../../context/HeaderContext';
import CheckPasswordModal from './CheckPasswordModal';

const PasswordModal = ({currentUser, handlePasswordModal, onCancel}) => {

  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 타이머 상태 변수
  const [passwordTimer, setPasswordTimer] = useState(null);
  // 리랜더링으로 값을 잃어버리지 않게 상태 저장
  const timerRef = useRef(null);
  // 인증번호 검증로직
  const verifyCodeRegex = /^\d{6}$/;
  // 비밀번호 변경 모달 활성화 여부
  const [viewCheckPasswordModal, setViewCheckPasswordModal] = useState(false);

  const [emailAuthCode, setEmailAuthCode] = useState('');
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(null);

  // 인증번호 입력값을 받는 함수
  const handleChangeEmailAuthCode = (e) => {
    const value = e.target.value;
    setEmailAuthCode(value);
    setIsEmailCodeValid(verifyCodeRegex.test(value));
  };

  // 인증번호 확인 로직
  const verifyEmailCode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/email/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailAuthCode)
      });

      const result = await response.json();

      if (result) {
        alert("인증 성공");
        clearInterval(timerRef.current);
        setPasswordTimer(null);
        setViewCheckPasswordModal(true);
      } else {
        alert(result.message || "인증번호가 틀렸습니다.");
      }
    } catch (err) {
      alert("인증 요청에 실패했습니다.");
      console.error(err);
    }
  };

  // 타이머 포맷 함수
  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  // 초마다 줄어드는 함수
  useEffect(() => {
    clearInterval(timerRef.current); // 기존 타이머 제거
    if (passwordTimer > 0) {
      timerRef.current = setInterval(() => {
        setPasswordTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [passwordTimer]);

  // 인증시간이 0이 되면 강제 취소
  useEffect(() => {
    if (passwordTimer === 0) {
      clearInterval(timerRef.current);
      alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
      onCancel()
    }
  }, [passwordTimer]);

  // 이메일 전송
  const sendEmailCode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/email/send`, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify("kimys31892@gmail.com")
      });
      // body: JSON.stringify(currentUser.memberEmail)

      const result = await response.json();
      alert(result.message || "인증 메일이 전송되었습니다.");
      setPasswordTimer(180);
    } catch (err) {
      console.error(err)
      alert("이메일 전송에 실패했습니다.");
    }
  };

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  // 헤더 스크롤을 막는 함수
  useEffect(() => {
    if (handlePasswordModal) lockScroll();
    return () => unlockScroll();
  }, [handlePasswordModal]);
  
  if (!handlePasswordModal) return (
    <>
    </>
  );

  return (
    <div>
      <S.Backdrop>
        <S.ModalContainer onClick={(e) => e.stopPropagation()}>
          <S.TitleContainer>
            <S.Title>비밀번호 변경</S.Title>
            <S.CloseButton 
              src='/assets/images/modal/close-button.png' 
              alt='x버튼' 
              onClick={onCancel} 
            />
          </S.TitleContainer>
          <S.ContentContainer>
            {passwordTimer > 0 ? (
              <div>인증번호를 이메일로 발송하였습니다.</div>
            ) : (
              <div>인증번호를 전송해주세요.</div>
            )}
            <S.InputContainer>
              <S.MemberInfoInput 
                placeholder="인증번호 6자리"
                value={emailAuthCode}
                onChange={handleChangeEmailAuthCode}
              />
              <S.SendCodeButton 
                onClick={sendEmailCode}
                disabled={passwordTimer > 0}
              >
                {passwordTimer > 0 ? 
                  formatTimer(passwordTimer) : "전송"
                }
              </S.SendCodeButton>
            </S.InputContainer>
            {isEmailCodeValid === false && (
              <S.ErrorMessage>
                인증번호는 6자리 숫자여야 합니다.
              </S.ErrorMessage>
            )}
          </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={verifyEmailCode}
              disabled={!isEmailCodeValid || passwordTimer <= 0}
            >
              확인
            </S.ConfirmButton>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.ModalContainer>
      </S.Backdrop>

      {/* 비밀번호 변경 모달 */}
      {viewCheckPasswordModal && (
        <CheckPasswordModal
          memberId={memberId}
          handleCheckPasswordModal={viewCheckPasswordModal}
          onCancel={() => setViewCheckPasswordModal(false)}
          outModal={() => {
            onCancel()
            setViewCheckPasswordModal(false)
          }}
        />
      )}

    </div>
  );
};

export default PasswordModal;