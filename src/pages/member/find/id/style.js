import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import {
  gray2Color,
  gray3Color,
  gray5Color,
  gray6Color,
  mainGreenColor,
  subGreenColor,
  subBlueColor,
  warningRedColor,
  lightGreenColor,
  whiteColor,
  fontSizeH5,
  fontSizeH7,
  fontSizeH9,
  fontWeightLight,
  fontWeightBold,
  fontWeightRegular
} from '../../../../globals/common';

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.Wrapper = styled.div`
  width: 460px;
`;

S.LogoWrapper = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0px;
`;

S.Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    line-height: 10px;

    color: black;
    ${fontSizeH7};
    ${fontWeightRegular};
  }
`;

S.SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    text-align: center;
    line-height: 40px;
    ${fontSizeH5};
    margin: 40px 0px;
    ${fontWeightRegular};
  }
`;

S.Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

S.InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid;
  ${gray2Color};
  border-radius: 10px;
  margin-bottom: -1px;

  input {
    width: 100%;
    height: 60px;
    padding: 10px 50px 10px 10px;
    ${gray6Color};
    margin: 0px 50px;
    border: none;
    display: block;
    ${fontSizeH7};
    box-sizing: border-box;
    outline: none;
    transition: all 0.3s ease-in-out;
  }

  .input-icon {
    position: absolute;
    left: 15px;
    width: 20px;
    height: 20px;
  }

  .phone-confirm-check {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 1;
  }
`;

S.PhoneButton = styled.button`
  width: 200px;
  line-height: 30px;
  margin-right: 15px;
  border: 1px solid;
  ${subGreenColor};
  background-color: white;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
  }

  &.process {
    ${subGreenColor};
    border: 1px solid;
    ${subGreenColor};
  }

  &.success {
    ${subBlueColor}
    border: 1px solid;
    ${subBlueColor}
  }

  &.fail {
    ${warningRedColor}
    border: 1px solid;
    ${warningRedColor}
  }
`;

S.TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

S.ActiveStep = styled.span`
  color: #01CD74;
`;


S.StepText = styled.div`
  font-size: 14px;
  color: #555;
`;

S.VerifyButton = styled.button`
  height: 30px;
  padding: 0 15px;
  margin-left: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.PALLETE.primary.subGreen};
  background-color: ${({ theme }) => theme.PALLETE.white};
  color: ${({ theme }) => theme.PALLETE.primary.subGreen};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

S.TimerText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.h8};
  color: ${({ theme }) => theme.PALLETE.gray.gray4};
  margin-bottom: 10px;
`;

S.PhoneConfirm = styled.span`
  ${gray5Color};
  ${fontSizeH9};
  text-decoration: none;
  margin: 0 5px;
  text-align: center;
  width: 100px;
`;

S.AuthCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

S.ResultBox = styled.div`
    display: flex;
    width: 100%;
    height: 80px;
    margin-bottom: 40px;
    border: #C5CCD2 1px solid;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;

    span {
        width: 180px;
        margin-right: 30px;
    }
`
S.TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 24px;

    span {
        width: 100%;
        margin-left: 30px;
    }

    img {
        margin: 0;
    }
`
S.GoToFindPassword = styled(Link)`
    ${mainGreenColor}
    cursor: pointer;
    margin-left: 14px;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #218838;
    }
`


S.SignupButton = styled.button`
  width: 460px;
  height: 50px;
  padding: 10px;
  background-color: #8990A0;
  ${gray3Color};
  border: none;
  ${whiteColor};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-top: 20px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    cursor: pointer;
  }

  &.active:hover {
    background-color: #218838;
  }
`;

S.GoToLogin = styled(Link)`
  width: 460px;
  height: 50px;
  padding: 10px 160px;
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  ${gray3Color};
  border: none;
  ${whiteColor};
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #218838;
  }
`;

export default S;
