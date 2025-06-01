import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoin } from '../../JoinContext';
import S from './style';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

const SocialJoinInfo = () => {
  const { setJoinData } = useJoin();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [phoneAuthCodeValid, setPhoneAuthCodeValid] = useState(null);
  const [phoneMessage, setPhoneMessage] = useState('');
  const [birthValid, setBirthValid] = useState(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerifyMessage, setPhoneVerifyMessage] = useState('');
  const [showPhoneAuthInput, setShowPhoneAuthInput] = useState(false);
  const [passwordAuthTimer, setPasswordAuthTimer] = useState(180);
  const timerRef = useRef();

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isGenderTouched, setIsGenderTouched] = useState(false);

  useEffect(() => {
    if (showPhoneAuthInput && passwordAuthTimer > 0) {
      timerRef.current = setTimeout(() => setPasswordAuthTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [showPhoneAuthInput, passwordAuthTimer]);

  const handleChangePhone = (e) => {
  const value = e.target.value;
  const onlyNumbers = /^[0-9]*$/;

  if (!onlyNumbers.test(value)) {
    setPhoneMessage('※ 숫자만 입력 가능합니다.');
    setPhone('');
    return;
  }

  setPhone(value);

  if (value.length === 0) {
    setPhoneMessage(''); // 아무 것도 입력 안 하면 메시지 없음
  } else if (value.length < 10) {
    setPhoneMessage('※ 번호는 최소 10자리 이상이어야 합니다.');
  } else if (/^\d{10,11}$/.test(value)) {
    setPhoneMessage('※ 올바른 번호 형식입니다.');
  } else {
    setPhoneMessage('');
  }
};

  const handleSendPhoneAuth = async () => {
    const checkUrl = `${process.env.REACT_APP_BACKEND_URL}/members/api/phone/check?phone=${encodeURIComponent(phone)}`;
    const res = await fetch(checkUrl);
    const data = await res.json();

    if (data) {
      alert(data.message || '이미 등록된 번호입니다.');
      setPhoneMessage('※ 이미 등록된 전화번호입니다.');
      return;
    }

    // const sendRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/sms/send`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(phone)
      // });
      // const sendData = await sendRes.json();
      // alert(sendData.message);
      // setPhoneValidation(true);
      // setPhoneMessage("※ 인증번호가 발송되었습니다.");
      // showPhoneAuthInput(true)
      // setPasswordAuthTimer(180);

      // 프론트 테스트용 처리
    alert('※ 인증번호 [000000] (테스트용)이 발송되었습니다.');
    setPhoneMessage('※ 인증번호가 발송되었습니다. (000000)');
    setShowPhoneAuthInput(true);
    setPasswordAuthTimer(180);
  };

  const handleCheckPhoneCode = () => {
    // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sms/api/phone/verify-code`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(phoneAuthCode)
      // });
      // const data = await res.json();
      // if (data.isFlag) {
      //   setPhoneAuthCodeValid(true);
      //   setPhoneVerified(true);
      //   setPhoneVerifyMessage(data.message || "※ 휴대전화번호 인증 완료");
      //   alert("인증 완료!");
      //   clearInterval(timerRef.current);
      // } else {
      //   setPhoneAuthCodeValid(false);
      //   setPhoneVerified(false);
      //   setPhoneVerifyMessage(data.message || "※ 휴대전화번호 인증 실패");
      //   alert("인증 실패!");
      // }

      // 프론트 테스트 로직
    if (phoneAuthCode === '000000') {
      setPhoneAuthCodeValid(true);
      setPhoneVerified(true);
      setPhoneVerifyMessage('※ 휴대전화번호 인증 완료');
      alert('인증 완료!');
      clearInterval(timerRef.current);
    } else {
      setPhoneAuthCodeValid(false);
      setPhoneVerified(false);
      setPhoneVerifyMessage('※ 인증번호 인증 실패');
      alert('인증 실패!');
    }
  };

  const formatTimer = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const isNameValid = name.trim().length > 0;
  const isGenderValid = gender !== '';

  const isFormValid = isNameValid && isGenderValid && birth && phone && phoneVerified;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneVerified) {
      setPhoneVerifyMessage('※ 휴대전화 인증을 완료해주세요.');
      return;
    }
    setJoinData((prev) => ({
      ...prev,
      memberName: name,
      memberGender: gender,
      memberBirth: birth,
      memberPhone: phone
    }));
    navigate('/member/join/social/profile');
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.NameInputWrapper
          isValid={
            isNameTouched || isGenderTouched
              ? isNameValid && isGenderValid
              : null
          }
        >
          <S.Icon src="/assets/images/member/smile.png" />
          <S.Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameTouched(true);
            }}
            required
          />
          <S.GenderSelect>
            <label>
              <S.HiddenRadio
                type="radio"
                name="gender"
                value="남성"
                checked={gender === '남성'}
                onChange={(e) => {
                  setGender(e.target.value);
                  setIsGenderTouched(true);
                }}
              />
              <S.GenderButton active={gender === '남성'}>남성</S.GenderButton>
            </label>
            <label>
              <S.HiddenRadio
                type="radio"
                name="gender"
                value="여성"
                checked={gender === '여성'}
                onChange={(e) => {
                  setGender(e.target.value);
                  setIsGenderTouched(true);
                }}
              />
              <S.GenderButton active={gender === '여성'}>여성</S.GenderButton>
            </label>
          </S.GenderSelect>
        </S.NameInputWrapper>
        {(isNameTouched || isGenderTouched) && (
          <S.FailMessage style={{ color: isNameValid && isGenderValid ? '#01CD74' : '#FF3F3F' }}>
            {isNameValid && isGenderValid ? '※ 입력 완료' : '※ 이름과 성별을 모두 입력해주세요.'}
          </S.FailMessage>
        )}

        <S.BirthInputWrapper
          isValid={birthValid === null ? null : birthValid}
        >
          <S.Icon src="/assets/images/member/calendar-icon.png" />
          <Flatpickr
            options={{ dateFormat: 'Y-m-d' }}
            value={birth}
            onChange={([date]) => {
              setBirth(date);
              setBirthValid(!!date);
            }}
            render={({ render, ...props }, ref) => {
              const { options, value, ...restProps } = props;  // options, value 분리
              return (
                <S.Input
                  {...restProps}
                  ref={ref}
                  placeholder="생년월일 선택"
                  required
                  defaultValue={value}  // value 대신 defaultValue로 처리
                />
              );
            }}
          />
        </S.BirthInputWrapper>
        {birthValid !== null && (
          <S.FailMessage style={{ color: birthValid ? '#01CD74' : '#FF3F3F' }}>
            {birthValid ? '※ 입력 완료' : '※ 생년월일은 필수 정보입니다.'}
          </S.FailMessage>
        )}

        <S.PhoneInputWrapper
          isValid={phone.length === 0 ? null : /^\d{10,11}$/.test(phone)}
        >
          <S.Icon src="/assets/images/member/phone-icon.png" />
          <S.Input
            type="tel"
            placeholder="휴대전화번호"
            value={phone}
            onChange={handleChangePhone}
            required
          />
          <S.StatusButton type="button" onClick={handleSendPhoneAuth}>인증번호 발송</S.StatusButton>
        </S.PhoneInputWrapper>
        {phoneMessage && (
          <S.FailMessage style={{ color: /^\d{10,11}$/.test(phone) ? '#01CD74' : '#FF3F3F' }}>
            {phoneMessage}
          </S.FailMessage>
        )}

        {showPhoneAuthInput && (
          <S.PhoneVerifyCodeInputWrapper
            isValid={phoneAuthCodeValid === null ? null : phoneAuthCodeValid}
          >
            <S.Icon src="/assets/images/member/lock-icon.png" />
            <S.Input
              type="text"
              placeholder="인증번호 6자리 입력"
              value={phoneAuthCode}
              onChange={(e) => setPhoneAuthCode(e.target.value)}
            />
            {passwordAuthTimer > 0 && (
              <span style={{ marginRight: '10px', fontSize: '14px', color: '#555' }}>
                {formatTimer(passwordAuthTimer)}
              </span>
            )}
            <S.StatusButton type="button" onClick={handleCheckPhoneCode}>확인</S.StatusButton>
          </S.PhoneVerifyCodeInputWrapper>
        )}
        {phoneVerifyMessage && (
          <S.FailMessage style={{ color: phoneVerified ? '#01CD74' : '#FF3F3F' }}>
            {phoneVerifyMessage}
          </S.FailMessage>
        )}

        <S.SubmitButton type="submit" disabled={!isFormValid} className={isFormValid ? 'active' : ''}>
          가입하기
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default SocialJoinInfo;
