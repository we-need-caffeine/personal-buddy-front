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
  const [passwordTimer, setPasswordTimer] = useState(0);
  // 리랜더링으로 값을 잃어버리지 않게 상태 저장
  const timerRef = useRef(null);
  // 인증번호 검증로직
  const verifyCodeRegex = /^\d{6}$/;

  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [isVerifyCodeValid, setIsVerifyCodeValid] = useState(null);
  const [phoneValidation, setPhoneValidation] = useState(null);
  
  const handleChangePhoneAuthCode = (e) => {
    const value = e.target.value;
    setPhoneAuthCode(value);
    setIsVerifyCodeValid(verifyCodeRegex.test(value));
  };

  // 초마다 줄어드는 함수
  useEffect(() => {
    if (passwordTimer > 0) {
      timerRef.current = setInterval(() => {
        setPasswordTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [passwordTimer]);

  // 외부 요소 스크롤을 막는 함수
  const { lockScroll, unlockScroll } = useContext(HeaderContext);

  // 전화번호 변경을 요청하는 함수
  // 인증 번호가 일치하는지 검증한 후, 전화번호 변경
  const updatePhoneNum = async() => {
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

  // 인증번호를 전송하는 함수
  useEffect(() => {
    // let phone = phoneNum;
    // const sendRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/sms/send`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(phone)
    // });
    // const sendData = await sendRes.json();
    // alert(sendData.message);
    // setPhoneValidation(true);
    // setPasswordTimer(180);

    //------------------프론트 테스트용 처리
    alert("※ 인증번호 [000000] (테스트용)이 발송되었습니다.");
    setPhoneValidation(true);
    setPasswordTimer(180);
  }, [currentUser, phoneNum, handleCheckPhoneModal])

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
      <S.BackdropNone onClick={onCancel}>
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
                <S.ReSendMessage>
                  재요청
                </S.ReSendMessage>
              </S.InputContainer>
              {isVerifyCodeValid === false && (
                <S.ErrorMessage>
                  올바르지 않은 인증번호입니다.
                </S.ErrorMessage>
              )}
            </S.ContentContainer>
          <S.ButtonContainer>
            <S.ConfirmButton
              onClick={updatePhoneNum}
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