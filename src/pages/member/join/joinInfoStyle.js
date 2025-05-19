import styled from 'styled-components';
import {
  fontSizeH8,
  fontSizeH9,
  pointRedColor,
  mainGreenColor,
  gray4Color,
} from '../../../globals/common';

const S = {};

// 기본 레이아웃
S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


S.Form = styled.form`
  background: white;
  width: 460px;
  margin-top: 30px;
`;

S.HiddenRadio = styled.input`
  display: none;
`;

S.InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  /* border-radius: 10px; */
  transition: border 0.3s ease-in-out;
`;

S.EmailInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: border 0.3s ease-in-out;
`;

S.NameInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  transition: border 0.3s ease-in-out;
`;

S.BirthInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ validationState  }) => {
      if (validationState  === true) return '#01CD74';
      if (validationState  === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  transition: border 0.3s ease-in-out;
`;

S.PhoneInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid  }) => {
      if (isValid  === true) return '#01CD74';
      if (isValid  === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  transition: border 0.3s ease-in-out;
`;

S.EmailVerifyCodeInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};

  transition: border 0.3s ease-in-out;
`;

S.PhoneVerifyCodeInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -1px;
  border: 1px solid
  ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  transition: border 0.3s ease-in-out;
`;


// 인증번호 전용 래퍼
S.AuthInputWrapper = styled(S.InputWrapper)`
  justify-content: space-between;
`;

// 입력 필드
S.Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 10px 50px 10px 10px;
  color: ${({ theme }) => theme.PALLETE.gray.gray6};
  margin: 0px 35px 0px 50px;
  border: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  box-sizing: border-box;
  outline: none;
`;

// 아이콘
S.Icon = styled.img`
  position: absolute;
  left: 15px;
  width: 20px;
  height: 20px;
`;

// 상태 기반 버튼
S.StatusButton = styled.button`
  width: 200px;
  line-height: 30px;
  margin-right: 15px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  background-color: ${({ theme }) => theme.PALLETE.white};

  color: ${({ status, theme }) => {
    switch (status) {
      case 'success': return theme.PALLETE.primary.subBlue;
      case 'fail': return theme.PALLETE.warningRed;
      default: return theme.PALLETE.primary.subGreen;
    }
  }};
  border: 1px solid ${({ status, theme }) => {
    switch (status) {
      case 'success': return theme.PALLETE.primary.subBlue;
      case 'fail': return theme.PALLETE.warningRed;
      default: return theme.PALLETE.primary.subGreen;
    }
  }};

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

// 비밀번호 토글 아이콘
S.TogglePassword = styled.img`
  position: absolute;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

// 성별 선택
S.GenderSelect = styled.div`
  display: flex;
  margin: 0px 15px 0px -15px;
`;

S.GenderButton = styled.span`
  display: inline-block;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray3};
  font-size: ${({ theme }) => theme.FONT_SIZE.h9};
  color: ${(props) =>
    props.active
      ? props.theme.PALLETE.primary.subGreen
      : props.theme.PALLETE.gray.gray4};
  background-color: ${(props) =>
    props.active
      ? props.theme.PALLETE.primary.lightGreen
      : props.theme.PALLETE.white};
  font-weight: ${(props) => (props.active ? 500 : 300)};
  border-radius: ${(props) =>
    props.children === '남성' ? '10px 0 0 10px' : '0 10px 10px 0'};
`;

// 인증 타이머
S.TimerText = styled.span`
  margin-right: 10px;
  ${fontSizeH9}
  color: ${({ theme }) => theme.PALLETE.gray.gray5};
`;

// 인증 상태 메시지
S.StatusMessage = styled.span`
  display: block;
  ${fontSizeH8}
  font-weight: 300;
  color: ${(props) =>
    props.success ? props.theme.PALLETE.primary.mainGreen : props.theme.PALLETE.warningRed};
  margin-left: 10px;
  line-height: 30px;
`;

// 기본 실패 메시지
S.FailMessage = styled.span`
  display: block;
  ${fontSizeH8}
  font-weight: 300;
  ${pointRedColor}
  margin-left: 10px;
  line-height: 30px;
`;

// 가입 버튼
S.SubmitButton = styled.button`
  width: 460px;
  height: 50px;
  padding: 10px;
  background-color: #a5adb8;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-top: 40px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    cursor: pointer;
  }
`;

export default S;
