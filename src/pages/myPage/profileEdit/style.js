import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, gray3Color, gray5Color, gray6Color, mainGreenColor, warningRedColor, whiteColor } from "../../../globals/common";

const S = {};

S.MainContainer = styled.div`
`

S.TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.black};
  ${fontSizeH8}
  ${fontWeightLight}
`

S.TitleTopContainer = styled.div`

  & span {
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    padding: 0 0 6px 0;
  }
`

S.TitleBottomContainer = styled.div`

  & span {
    font-size: 30px;
    font-weight: 700;
    color: #222;
    text-align: left;
    display: flex;
    padding-bottom: 40px;
  }
`

S.TitleTopLinkText = styled.div`
  ${fontWeightRegular}
  ${gray6Color}
  ${fontSizeH8}
  &:hover {
    ${mainGreenColor}
  }
`

S.BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin-bottom: 200px;
  gap: 100px;
`

S.MemberProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 80px;
`

S.ImagePlusButton = styled.label`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #333333;
  opacity: 0.5;
  background-image: url("/../assets/images/member/plus-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

S.ImageMinusButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  top: 30%;
  right: 2%;
  background-color: #333333;
  opacity: 0.5;
  background-image: url("/../assets/images/member/minus-icon.png");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

// 프로필 이미지
S.ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

// 텍스트 인풋
S.BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 40px;
`

S.InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`

S.InputTextTitle = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 10px;
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }
  h2 {
    font-size: 13px;
    font-weight: 300;
    color: #666;
  }
  margin: 0 0 12px 0;
`

S.MemberInfoInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray3};
  span {
    ${gray3Color}
    ${fontWeightBold}
    padding-right: 20px;
  }
`

S.MemberInfoInput = styled.input`
  display: flex;
  font-size: 20px;
  font-weight: 300;
  color: #222;
  padding: 20px;
  border: none;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease-in-out;
`

S.ErrorMessage = styled.span`
  height: 10px;
  ${warningRedColor}
  ${fontSizeH9}
`

S.SaveBtnContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`

S.SaveBtn = styled.button`
  width: 87px;
  height: 43px;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray4}; // 비활성화
  border: none;
  ${whiteColor}
  ${fontWeightBold}
  ${fontSizeH6}
  border-radius: 30px;
  cursor: not-allowed;
  transition: all 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    cursor: pointer;
  }

  &.active:hover {
    background-color: #007799;
  }
`;

export default S;