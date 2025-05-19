import styled from 'styled-components';
import { fontSizeH8, fontSizeH9, fontWeightBold, fontWeightRegular, gray5Color, mainGreenColor, whiteColor } from '../../../globals/common';

const S = {};

S.CardContainer = styled.div`
  width: 320px;
  padding: 20px;  
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALLETE.white};
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

S.MemberInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

S.MemberProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 0;
`;

S.MemberInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 15px;
  gap: 5px;
`;

S.MemberNickName = styled.div`
  ${fontWeightBold}
  ${fontSizeH8}
`;

S.MemberStatusMessage = styled.div`
  ${fontSizeH9}
  ${fontWeightRegular}
  ${gray5Color}
`;

S.FollowInfoContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`
S.FavoriteBtn = styled.img`
  cursor: pointer;
`

S.FollowBtn = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  border-radius: 5px;
  ${whiteColor}
  ${fontSizeH9}
  ${fontWeightBold}
  background-color: ${({ isFollow, theme }) => 
    isFollow === 1 ? theme.PALLETE.gray.gray3 : theme.PALLETE.primary.mainGreen
  };
  
`

S.FollowCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  ${fontSizeH8}
  ${fontWeightBold}
  ${gray5Color}
  gap: 30px;
  width: 320px;
  height: 30px;
  margin-top: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.gray.gray2};
`

S.FollowerCount = styled.div`
`

S.FollowCount = styled.div`
`

S.FollowCountText = styled.span`
  margin-right: 5px;
`

S.FollowCountSubText = styled.span`
  ${mainGreenColor}
`

S.AcheivementContainer = styled.div`
  padding: 10px 60px 20px 60px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`

S.AcheivementItems = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

S.SocialButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`

S.MyPageButton = styled.button`
  width: 130px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.PALLETE.primary.subGreen};
  ${whiteColor}
  ${fontSizeH8}
  ${fontWeightBold}
`

S.MessageButton = styled.button`
  width: 130px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
  ${whiteColor}
  ${fontSizeH8}
  ${fontWeightBold}
`

export default S;
