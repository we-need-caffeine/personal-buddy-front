import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, fontWeightThin, gray5Color, gray6Color, mainGreenColor, pointRedColor, whiteColor } from "../../../globals/common";

const S = {};

S.MainContainer = styled.div`
`

S.TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    margin: 0 0 13px 0;
  }
`

S.TitleBottomContainer = styled.div`

  & span {
    display: flex;
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin: 0 0 40px 0;
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
  width: 100%;
  height: 100%;
  padding-top: 30px;
`

S.InputTextTitle = styled.div`

  & h1 {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin: 0 0 12px 0;
  }
`

S.MemberInfoInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1120px;
  padding: 20px;
  font-weight: 500;
  border: 1px solid #BBBBBB;

  font-size: 20px;
  font-weight: 300;
  color: #222;

  span {
    ${fontSizeH7}
    ${pointRedColor}
    font-weight: 500;
    cursor: pointer;
  }
  margin: 0 0 40px 0;
`

S.MemberInfo = styled.div`
`

S.BtnContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 60px;
  margin-bottom: 100px;
  display: flex;
  justify-content: right;
`

S.WithdrawBtn = styled.button`
  padding: 8px 18px;
  background-color: ${({ theme }) => theme.PALLETE.warningRed};
  border: none;
  border-radius: 30px;
  ${fontWeightBold}
  ${fontSizeH7}
  ${whiteColor}
`

export default S;