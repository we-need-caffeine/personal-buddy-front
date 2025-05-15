import React, { useState } from 'react';
import {
  Container,
  Logo,
  Wrapper,
  Checkbox,
  NextButton
} from './style';
import logo from '../assets/images/member/logo-login.png';
import checkboxTrue from '../assets/images/member/checkbox-icon-true.png';
import checkboxFalse from '../assets/images/member/checkbox-icon-false.png';

const JoinAgree = () => {
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    information: false,
    location: false
  });

  const toggle = (key) => {
    if (key === 'all') {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        service: newValue,
        information: newValue,
        location: newValue
      });
    } else {
      setAgreements((prev) => {
        const updated = { ...prev, [key]: !prev[key] };
        updated.all = updated.service && updated.information && updated.location;
        return updated;
      });
    }
  };

  const isValid = agreements.service && agreements.information && agreements.location;

  return (
    <Container>
      <Logo src={logo} alt="Personal Buddy 로고" />
      <form action="join-write.member" method="post">
        <Wrapper>
          <input type="hidden" name="agreeAll" value={agreements.all ? 1 : 0} />
          <Checkbox
            src={agreements.all ? checkboxTrue : checkboxFalse}
            alt="전체 동의"
            onClick={() => toggle('all')}
          />
          <span onClick={() => toggle('all')}>전체 동의</span>
        </Wrapper>

        <Wrapper>
          <input type="hidden" name="agreeService" value={agreements.service ? 1 : 0} required />
          <Checkbox
            src={agreements.service ? checkboxTrue : checkboxFalse}
            alt="이용약관"
            onClick={() => toggle('service')}
          />
          <span>[필수] 퍼스널 버디 이용약관</span>
          <p>약관 내용 ...</p>
        </Wrapper>

        <Wrapper>
          <input type="hidden" name="agreeInformation" value={agreements.information ? 1 : 0} required />
          <Checkbox
            src={agreements.information ? checkboxTrue : checkboxFalse}
            alt="개인정보 수집"
            onClick={() => toggle('information')}
          />
          <span>[필수] 개인정보 수집 및 이용</span>
          <p>개인정보 약관 내용 ...</p>
        </Wrapper>

        <Wrapper>
          <input type="hidden" name="agreeLocation" value={agreements.location ? 1 : 0} required />
          <Checkbox
            src={agreements.location ? checkboxTrue : checkboxFalse}
            alt="위치기반 서비스"
            onClick={() => toggle('location')}
          />
          <span>[필수] 위치기반 서비스 이용약관</span>
          <p>위치기반 약관 내용 ...</p>
        </Wrapper>

        <NextButton type="submit" disabled={!isValid}>
          다음
        </NextButton>
      </form>
    </Container>
  );
};

export default JoinAgree;
