import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH8, fontSizeH9, fontWeightLight, fontWeightMedium, fontWeightRegular, fontWeightThin, gray5Color, gray6Color, mainGreenColor } from "../../../globals/common";

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
  margin-bottom: 50px;
`

S.ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap : 20px;
  border-bottom: 1px solid #eee;
  padding: 30px 0;
`

S.ImgWrap = styled.div`
  object-fit: cover;
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
`

S.ItemImg = styled.img`
  width: 100%;
`

S.ItemContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
`

S.CreateTimeWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

S.ItemCreateTime = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: #999;
`

S.ItemTitle = styled.span`
  font-size: 18px;
  flex-shrink: 0;
  font-weight: 500;
  color: #222;
  margin: 0 0 12px 0;
`

S.ItemContent = styled.span`
  font-size: 18px;
  font-weight: 300;
  color: #000;
  flex: 1;
  margin: 0 0 12px 0;
`

S.ItemInfoContainer = styled.div`
  display: flex;
  gap: 10px;
`

S.ItemInfo = styled.div`
  display: flex;
  align-items: center;
  & span {
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #666;
    font-weight: 300;
  }
`

S.ItemIconImg = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 3px;
`

S.ItemInfoCount = styled.span`
  ${fontWeightRegular}
  ${blackColor}
  ${fontSizeH9}
  padding-left: 5px;
`

export default S;