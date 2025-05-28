import styled from "styled-components";
import { blackColor, flexBaseTop, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, gray5Color, gray6Color, mainGreenColor, whiteColor } from "../../../globals/common";
import { Link } from "react-router-dom";

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

S.SaveAchievementMainBtn = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
  width: 80px;
  height: 30px;
  border-radius: 50px;
  ${whiteColor}
  ${fontSizeH8}
  ${fontWeightBold}
  &:hover {
    background-color: #007799;
  }
`

S.AchievementMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 140px 0px 140px 0px;
`

S.BuddyLogoImg = styled.img`
  width: 200px;
`

S.NotFoundAchievementText =styled.span`
  ${gray5Color}
  ${fontSizeH4}
  ${fontWeightRegular}
  line-height: 48px;
`

S.AchievementListBox = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 120px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

S.AchievementCard = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;  
  flex-direction: column;
  width: 200px;
  height: 230px;
  border-radius: 20px;
  box-sizing: border-box;
  border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray4};
`

S.AchievementIcon = styled.img`

`

export default S;