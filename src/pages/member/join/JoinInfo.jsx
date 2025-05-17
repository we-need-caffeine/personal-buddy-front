import React, { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import {
  Container,
  Form,
  InputWrapper,
  EmailInputWrapper,
  NameInputWrapper,
  BirthInputWrapper,
  EmailVerifyCodeInputWrapper,
  Input,
  Icon,
  StatusButton, 
  TogglePassword,
  GenderSelect,
  GenderButton,
  PhoneVerifyCodeInputWrapper,
  FailMessage,
  SubmitButton,
  HiddenRadio
} from './joinInfoStyle';

const JoinInfo = () => {
  const [email, setEmail] = useState('');
  const [mailAuthCode, setMailAuthCode] = useState('');
  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailAuthCodeValid, setEmailAuthCodeValid] = useState(null);
  const [phoneAuthCodeValid, setPhoneAuthCodeValid] = useState(null);
  const [emailVerifyMessage, setEmailVerifyMessage] = useState('');
  const [showAuthInput, setShowAuthInput] = useState(true);
  const [authTimer, setAuthTimer] = useState(0);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const timerRef = useRef(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const [emailMessage, setEmailMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(null);

  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, name, gender, birth, phone });
  };

  const handleSendEmailAuth = async () => {
    try {

        const checkUrl = `http://localhost:10000/members/api/email/check?email=${encodeURIComponent(email)}`;
        const duplicateRes = await fetch(checkUrl, {
        method: "GET"
        });

        const duplicateData = await duplicateRes.json();

        if (!duplicateRes.ok || duplicateData.exists) {
        alert(duplicateData.message || "이미 등록된 이메일입니다.");
        return;
        }


        const response = await fetch("http://localhost:10000/sms/api/sendEmail", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "이메일 전송 실패");
            return;
        }

        alert(data.message || "이메일 인증번호가 전송되었습니다.");
        setShowAuthInput(true);
        setAuthTimer(180);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setAuthTimer((prev) => {
            if (prev <= 1) {
                clearInterval(timerRef.current);
                return 0;
            }
            return prev - 1;
            });
        }, 1000);
        } catch (error) {
        console.error("이메일 인증 오류:", error);
        alert("네트워크 오류가 발생했습니다.");
        }
    };

  const handleCheckEmailCode = async () => {
        try {
        const response = await fetch("http://localhost:10000/sms/api/verifyCode", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(mailAuthCode)
        });

        const data = await response.json();
        console.log("응답:", data);

        if (data.isFlag) {
            setEmailVerified(true);
            setEmailAuthCodeValid(true);
            setEmailVerifyMessage(data.message || "※ 이메일 인증 완료");
            clearInterval(timerRef.current);
        } else {
            setEmailVerified(false);
            setEmailAuthCodeValid(false);
            setEmailVerifyMessage(data.message || "※ 이메일 인증 실패");
            alert(data.message || "인증번호가 일치하지 않습니다.");
        }
        } catch (error) {
        console.error("인증번호 확인 오류:", error);
        }
    };

    const formatTimer = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <EmailInputWrapper isValid={isEmailValid}>
          <Icon src="/assets/images/member/message-icon.png" />
          <Input
            type="email"
            placeholder="아이디 (이메일 주소)"
            value={email}
            onChange={(e) => {
            const value = e.target.value;
            setEmail(value);

            if (!emailRegex.test(value)) {
                setEmailMessage('※ 이메일: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.');
                setIsEmailValid(false);
            } else {
                setEmailMessage('※ 사용 가능한 이메일입니다.');
                setIsEmailValid(true);
            }
            }}
            ref={emailRef}
            required
        />
          <StatusButton type="button" onClick={handleSendEmailAuth}>인증메일 발송</StatusButton>
        </EmailInputWrapper>
        {emailMessage && (
        <FailMessage style={{ color: isEmailValid ? 'green' : 'red' }}>
            {emailMessage}
        </FailMessage>
        )}

        {showAuthInput && (
            <EmailVerifyCodeInputWrapper isValid={emailAuthCodeValid}>
            <Icon src="/assets/images/member/send-mail.png" />
            <Input
            type="text"
            placeholder="인증번호 6자리 입력"
            value={mailAuthCode}
            onChange={(e) => setMailAuthCode(e.target.value)}
            />
            {authTimer > 0 && (
            <span style={{ marginRight: '10px', fontSize: '14px', color: '#555' }}>
                {formatTimer(authTimer)}
            </span>
            )}
            <StatusButton type="button" onClick={handleCheckEmailCode}>확인</StatusButton>
        </EmailVerifyCodeInputWrapper>
        )}

        {emailVerifyMessage && (
          <FailMessage style={{ color: emailVerified ? 'green' : 'red' }}>{emailVerifyMessage}</FailMessage>
        )}

        <InputWrapper isValid={isPasswordValid}>
        <Icon src="/assets/images/member/lock-icon.png" />
        <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
            const value = e.target.value;
            setPassword(value);

            if (value === '') {
                setIsPasswordValid(null); // 아무것도 안 썼으면 gray 유지
                setPasswordMessage('');
            } else if (!passwordRegex.test(value)) {
                setIsPasswordValid(false);
                setPasswordMessage('※ 영소문자, 숫자, 특수문자(!@#) 포함 8자 이상 입력하세요.');
            } else {
                setIsPasswordValid(true);
                setPasswordMessage('※ 사용 가능한 비밀번호입니다.');
            }
            }}
            required
        />
        <TogglePassword
            src={`/assets/images/member/see-password-icon-${showPassword ? 'true' : 'false'}.png`}
            onClick={togglePassword}
        />
        </InputWrapper>

        {passwordMessage && (
        <FailMessage style={{ color: isPasswordValid ? 'green' : 'red' }}>
            {passwordMessage}
        </FailMessage>
        )}

        <InputWrapper>
          <Icon src="/assets/images/member/smile.png" />
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <GenderSelect>
            <label>
              <HiddenRadio
                type="radio"
                name="gender"
                value="남성"
                checked={gender === '남성'}
                onChange={(e) => setGender(e.target.value)}
              />
              <GenderButton active={gender === '남성'}>남성</GenderButton>
            </label>
            <label>
              <HiddenRadio
                type="radio"
                name="gender"
                value="여성"
                checked={gender === '여성'}
                onChange={(e) => setGender(e.target.value)}
              />
              <GenderButton active={gender === '여성'}>여성</GenderButton>
            </label>
          </GenderSelect>
        </InputWrapper>

        <InputWrapper>
          <Icon src="/assets/images/member/calendar-icon.png" style={{ cursor: 'pointer' }} />
          <Flatpickr
            options={{ dateFormat: 'Y-m-d' }}
            value={birth}
            onChange={([date]) => setBirth(date)}
            render={({ defaultValue, value, ...props }, ref) => (
              <Input {...props} ref={ref} placeholder="생년월일 선택" required />
            )}
          />
        </InputWrapper>

        <InputWrapper>
          <Icon src="/assets/images/member/phone-icon.png" />
          <Input
            type="tel"
            placeholder="휴대전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <StatusButton type="button">인증번호 발송</StatusButton>
        </InputWrapper>

        {showAuthInput && (
            <PhoneVerifyCodeInputWrapper isValid={phoneAuthCodeValid}>
            <Icon src="/assets/images/member/lock-icon.png" />
            <Input
            type="text"
            placeholder="인증번호 6자리 입력"
            value={phoneAuthCode}
            onChange={(e) => setPhoneAuthCode(e.target.value)}
            />
            <StatusButton type="button" onClick={handleCheckEmailCode}>확인</StatusButton>
            {authTimer > 0 && (
            <span style={{ marginLeft: '10px', fontSize: '14px', color: '#555' }}>
                {formatTimer(authTimer)}
            </span>
            )}
        </PhoneVerifyCodeInputWrapper>
        )}

        <SubmitButton type="submit">가입하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default JoinInfo;
