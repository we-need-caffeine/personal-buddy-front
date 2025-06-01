import styled from 'styled-components';
import {
  fontSizeH8,
  fontSizeH9,
  pointRedColor,
  mainGreenColor,
  gray4Color,
} from '../../../../../globals/common';

const S = {};

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

S.InputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})`
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

S.NameInputWrapper = styled(S.InputWrapper).withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

S.BirthInputWrapper = styled(S.InputWrapper).withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})`
  border: 1px solid
    ${({ isValid }) => {
      if (isValid === true) return '#01CD74';
      if (isValid === false) return '#FF3F3F';
      return '#C5CCD2';
    }};
`;

S.PhoneInputWrapper = styled(S.InputWrapper).withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})``;

S.PhoneVerifyCodeInputWrapper = styled(S.InputWrapper).withConfig({
  shouldForwardProp: (prop) => prop !== 'isValid',
})`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

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

S.Icon = styled.img`
  position: absolute;
  left: 15px;
  width: 20px;
  height: 20px;
`;

S.StatusButton = styled.button`
  width: 200px;
  line-height: 30px;
  margin-right: 15px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  background-color: ${({ theme }) => theme.PALLETE.white};
  color: ${({ theme }) => theme.PALLETE.primary.subGreen};
  border: 1px solid ${({ theme }) => theme.PALLETE.primary.subGreen};
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

S.GenderSelect = styled.div`
  display: flex;
  margin: 0px 15px 0px -15px;
`;

S.GenderButton = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
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

S.FailMessage = styled.span`
  display: block;
  ${fontSizeH8}
  font-weight: 300;
  ${pointRedColor}
  margin-left: 10px;
  line-height: 30px;
`;

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
