import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, fontWeightThin, gray5Color, gray6Color, mainGreenColor, pointRedColor, whiteColor } from "../../../globals/common";

const S = {};

S.MainContainer = styled.div`
`

S.TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.black};
  ${fontSizeH8}
  ${fontWeightLight}
`

S.TitleTopContainer = styled.div`
  display: flex;
  justify-content: left;
`

S.TitleBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${fontSizeH6}
  ${blackColor}
  ${fontWeightRegular}
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
  gap: 10px;
  padding-top: 30px;
`

S.InputTextTitle = styled.div`
  margin-top: 30px;
  ${fontSizeH7}
  ${fontWeightMedium}
  ${blackColor}
`

S.MemberInfoInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1120px;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  ${fontSizeH7}
  ${fontWeightRegular}
  ${blackColor}
  border: 1px solid black;

  span{
    ${fontSizeH7}
    ${pointRedColor}
    ${fontWeightBold}
    cursor: pointer;
  }
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