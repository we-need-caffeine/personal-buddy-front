import React, { useContext, useEffect, useRef, useState } from 'react';
import { setUser } from '../../../../modules/member';
import { HeaderContext } from '../../../../context/HeaderContext';
import { useDispatch } from 'react-redux';
import S from './style';

const CheckPhoneModal = ({currentUser, phoneNum, handleCheckPhoneModal, onCancel, outModal}) => {

  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 리덕스에 변환된 정보를 담기 위해 호출
  const dispatch = useDispatch();
  // 타이머 상태 변수
  const [passwordTimer, setPasswordTimer] = useState(null);
  // 인증번호 요청을 최초 한번만 보내기 위해 저장
  const hasSentCodeRef = useRef(false);
  // 리랜더링으로 값을 잃어버리지 않게 상태 저장
  const timerRef = useRef(null);
  // 인증번호 검증로직
  const verifyCodeRegex = /^\d{6}$/;

  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [isVerifyCodeValid, setIsVerifyCodeValid] = useState(null);
  
  // 인증번호 입력값을 받는 함수
  const handleChangePhoneAuthCode = (e) => {
    const value = e.target.value;
    setPhoneAuthCode(value);
    setIsVerifyCodeValid(verifyCodeRegex.test(value));
  };

  const handleVerifyAndUpdate = () => {
    if (passwordTimer <= 0) {
      alert("인증 시간이 만료되었습니다.");
      return;
    }
    if (phoneAuthCode !== "000000") {
      alert("인증번호가 일치하지 않습니다.");
      return;
    }
    updatePhoneNum();
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

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  // 전화번호 변경을 요청하는 함수
  // 인증 번호가 일치하는지 검증한 후, 전화번호 변경
  const updatePhoneNum = async() => {

    // 인증번호를 검증하는 함수
    // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/phone/verify-code`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(phoneAuthCode)
    // });

    // const data = await res.json();

    // if (!data.isFlag) {
    //   alert(data.message || "인증번호가 일치하지 않습니다.");
    //   return;
    // }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/members/api/update`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        id: memberId,
        memberPhone: phoneNum
      })
    });
    if (response.ok) {
      alert('전화번호 변경 성공')
        dispatch(setUser({
          ...currentUser,
          memberPhone : phoneNum
        }))
      outModal()
    } else {
      alert('전화번호 변경 실패')
    }
  }

  // 인증번호를 전송하는 함수 실무용
  // useEffect(() => {
  //   let phone = phoneNum;
  //   const sendRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/sms/send`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(phone)
  //   });
  //   const sendData = await sendRes.json();
  //   alert(sendData.message);
  //   setPasswordTimer(180);
  // }, [currentUser, phoneNum, handleCheckPhoneModal])

  // 인증번호를 전송하는 함수, 테스트용
  useEffect(() => {
    if (!hasSentCodeRef.current && handleCheckPhoneModal) {
      alert("※ 인증번호 [000000] (테스트용)이 발송되었습니다.");
      setPasswordTimer(180);
      hasSentCodeRef.current = true; // 딱 1회만 실행
    }
  }, [handleCheckPhoneModal]);


  // 헤더 스크롤을 막는 함수
  useEffect(() => {
    if (handleCheckPhoneModal) lockScroll();
    return () => unlockScroll();
  }, [handleCheckPhoneModal]);
  
  if (!handleCheckPhoneModal) return (
    <>
    </>
  );

  return (
    <div>
      <S.BackdropNone>
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
              <div>인증번호를 메세지로 발송하였습니다.</div>
              <S.InputContainer>
                <S.MemberInfoInput
                  placeholder="인증번호 6자리"
                  value={phoneAuthCode}
                  onChange={handleChangePhoneAuthCode}
                />
                {passwordTimer > 0 && (
                  <S.Timer>
                    {formatTimer(passwordTimer)}
                  </S.Timer>
                )}
              </S.InputContainer>
              {isVerifyCodeValid === false && (
                <S.ErrorMessage>
                  인증번호는 6자리 숫자여야 합니다.
                </S.ErrorMessage>
              )}
            </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={handleVerifyAndUpdate}
              disabled={phoneAuthCode.length !== 6 || passwordTimer <= 0}
            >
              변경
            </S.ConfirmButton>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
          </S.ButtonContainer>
        </S.ModalContainer>
      </S.BackdropNone>
    </div>
  );
};

export default CheckPhoneModal;