// JoinInfo.jsx
import React, { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import {
  Container,
  Form,
  InputWrapper,
  Input,
  Icon,
  Button,
  TogglePassword,
  ConfirmCheck,
  GenderSelect,
  GenderButton,
  FailMessage,
  SubmitButton
} from './joinInfoStyle';

const JoinInfo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 최종 제출 로직
    console.log({ email, password, name, gender, birth, phone });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Icon src="/assets/images/member/message-icon.png" />
          <Input
            type="email"
            placeholder="아이디 (이메일 주소)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            required
          />
          <Button type="button">인증메일 발송</Button>
        </InputWrapper>

        <InputWrapper>
          <Icon src="/assets/images/member/lock-icon.png" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TogglePassword
            src={`/assets/images/member/see-password-icon-${showPassword ? 'true' : 'false'}.png`}
            onClick={togglePassword}
          />
        </InputWrapper>

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
              <input
                type="radio"
                name="gender"
                value="남성"
                checked={gender === '남성'}
                onChange={(e) => setGender(e.target.value)}
              />
              <GenderButton active={gender === '남성'}>남성</GenderButton>
            </label>
            <label>
              <input
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
          <Button type="button">인증번호 발송</Button>
        </InputWrapper>

        <SubmitButton type="submit">가입하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default JoinInfo;
