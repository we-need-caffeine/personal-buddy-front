import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, gray5Color, gray6Color, mainGreenColor, pointRedColor } from "../../../globals/common";

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
  span {
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    margin: 0 0 13px 0;
  }
`

S.TitleBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  color: #222;
  margin-bottom: 40px;
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
  span {
    margin-left: 5px;
    ${pointRedColor}
  }
`

S.BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`

S.ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding : 30px 20px;
  border-bottom: 1px solid #eee;
`

S.ListLeftContainer = styled.div`
  display: flex;
  h1{
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin-right: 10px;
  }
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  h3{
    font-size: 18px;
    font-weight: 300;
    color: #222;
  }
`

S.ListRightContainer = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #999;
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