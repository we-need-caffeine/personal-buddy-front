import styled from "styled-components";
import { blackColor, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, gray5Color, gray6Color, mainGreenColor, pointRedColor, whiteColor } from "../../../globals/common";

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
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;  
  width: 200px;
  height: 230px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: ${({ $isRep, theme }) => $isRep ? theme.PALLETE.primary.lightGreen : theme.PALLETE.white};
  border: 1px solid ${({ $isRep, theme }) => $isRep ? theme.PALLETE.primary.mainGreen : theme.PALLETE.gray.gray4};
`

S.AchievementIcon = styled.img`
  position: absolute;
  top: -40px;
`

S.DescriptionTitle = styled.span`
  text-align: center;
  width: 163px;
  padding: 57px 0px 17px 0px;
  ${fontSizeH6}
  ${fontWeightBold}
  border-bottom: 1px solid #B9D2C7;
`

S.DescriptionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 17px;
  gap: 12px;
`

S.DescriptionContainer = styled.div`
  width: 163px;
  gap: 5px;
  display: flex;
  justify-content: left;
`

S.Description = styled.span`
  ${fontSizeH8}
  ${fontWeightRegular}
`

S.DescriptionGetPoint = styled.span`
  ${fontSizeH8}
  ${fontWeightBold}
  ${pointRedColor}
`

export default S;