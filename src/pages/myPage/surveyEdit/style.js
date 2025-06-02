import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, fontWeightThin, gray5Color, gray6Color, mainGreenColor, whiteColor } from "../../../globals/common";

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
  padding-top: 30px;
`

S.CategoryBox = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
`

S.CategoryTitle = styled.div`
  ${fontWeightBold}
  ${fontSizeH6}
  ${gray5Color}
  padding-right: 20px;
  border-right: 3px solid ${({ theme }) => theme.PALLETE.gray.gray5};
  margin-right: 20px;
`

S.CategoryList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

S.CategoryItem = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.primary.subGreen};
  ${whiteColor}
  ${fontWeightRegular}
  ${fontSizeH7}
  border-radius: 30px;
  padding: 12px 16px;
`

export default S;