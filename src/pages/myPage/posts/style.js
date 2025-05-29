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

S.ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 129px;
  border-bottom: solid 1px ${({ theme }) => theme.PALLETE.gray.gray4};
`

S.ItemImg = styled.img`
  width: 200px;
  height: 110px;
`

S.ItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 40px;
  gap: 10px;
  margin-right: auto;
`

S.ItemCreateTime = styled.span`
  ${fontWeightRegular}
  ${gray5Color}
  ${fontSizeH9}
`

S.ItemTitle = styled.span`
  ${fontWeightMedium}
  ${blackColor}
  ${fontSizeH6}
`

S.ItemContent = styled.span`
  ${fontWeightThin}
  ${blackColor}
  ${fontSizeH8}
  line-height: 18px;
  max-width: 700px;
  max-height: 55px;
`

S.ItemInfoContainer = styled.div`
  display: flex;
  gap: 10px;
`

S.ItemInfo = styled.div`
`

S.ItemIconImg = styled.img`

`

S.ItemInfoCount = styled.span`
  ${fontWeightRegular}
  ${blackColor}
  ${fontSizeH9}
  padding-left: 5px;
`

export default S;