import styled from 'styled-components';
import {
  fontSizeH8,
  pointRedColor,
  gray2Color,
  gray3Color,
  gray4Color,
  gray6Color,
  whiteColor,
  subGreenColor,
  lightGreenColor,
  mainGreenColor,
  fontWeightBold,
  fontSizeH7,
  fontSizeH9
} from '../../../globals/common';

export const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.PALLETE.white};
  width: 460px;
  margin-top: 30px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray2};
  margin-bottom: -1px;
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  padding: 10px 50px 10px 10px;
  ${gray6Color}
  margin: 0px 50px;
  border: none;
  ${fontSizeH7}
  box-sizing: border-box;
  outline: none;
`;

export const Icon = styled.img`
  position: absolute;
  left: 15px;
  width: 20px;
  height: 20px;
`;

export const Button = styled.button`
  width: 200px;
  line-height: 30px;
  margin-right: 15px;
  ${whiteColor}
  ${subGreenColor}
  border: 1px solid ${({ theme }) => theme.PALLETE.primary.subGreen};
  border-radius: 10px;

  &:hover {
    ${lightGreenColor}
    ${fontWeightBold}
  }
`;

export const TogglePassword = styled.img`
  position: absolute;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const GenderSelect = styled.div`
  display: flex;
  margin: 0px 15px 0px -15px;
`;

export const GenderButton = styled.span`
  display: inline-block;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray3};
  ${fontSizeH9}
  color: ${(props) => (props.active ? props.theme.PALLETE.primary.subGreen : props.theme.PALLETE.gray.gray4)};
  background-color: ${(props) => (props.active ? props.theme.PALLETE.primary.lightGreen : props.theme.PALLETE.white)};
  font-weight: ${(props) => (props.active ? 500 : 300)};
  border-radius: ${(props) =>
    props.children === '남성' ? '10px 0 0 10px' : '0 10px 10px 0'};
`;

export const ConfirmCheck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
`;

export const FailMessage = styled.span`
  display: block;
  ${fontSizeH8}
  font-weight: 300;
  ${pointRedColor}
  margin-left: 10px;
  line-height: 30px;
`;

export const SubmitButton = styled.button`
  width: 460px;
  height: 50px;
  padding: 10px;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray4}; /* 비활성화 색상 */
  border: none;
  color: ${({ theme }) => theme.PALLETE.white};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-top: 40px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    ${mainGreenColor}
    cursor: pointer;
  }

  &.active:hover {
    background-color: #218838;
  }
`;
