import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH8, fontSizeH9, fontWeightLight, fontWeightMedium, fontWeightRegular, fontWeightThin, gray5Color, gray6Color, mainGreenColor } from "../../../globals/common";

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
  gap: 20px;
  padding-top: 20px;
`

export default S;