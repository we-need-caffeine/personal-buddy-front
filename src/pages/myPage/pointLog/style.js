import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, gray5Color, gray6Color, mainGreenColor, pointRedColor } from "../../../globals/common";

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

S.TitleMemberPoint = styled.div`
  ${fontWeightRegular}
  ${gray6Color}
  ${fontSizeH8}
  span{
    margin-left: 5px;
    ${pointRedColor}
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

S.ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.gray5};
  padding-bottom: 20px;
`

S.ListLeftContainer = styled.div`
  display: flex;
  h1{
    ${fontSizeH8}
    ${fontWeightBold}
    padding-right: 10px;
  }
  h3{
    ${fontSizeH8}
    ${fontWeightRegular}
    ${gray5Color}
  }
`

S.ListRightContainer = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  ${gray5Color}
`

S.PointAmount = styled.h2`
  ${fontWeightRegular}
  ${fontSizeH8}
  color: ${({ $isPositive, theme }) => (
    $isPositive ? theme.PALLETE.pointRed : theme.PALLETE.primary.subBlue
  )};
  width: 100px;
  text-align: left;
`;

export default S;