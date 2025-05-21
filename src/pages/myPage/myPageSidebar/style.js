import styled from 'styled-components';
import { blackColor, fontSizeH6, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightMedium, fontWeightRegular, gray5Color, mainGreenColor, whiteColor } from '../../../globals/common';

const S = {};

S.MyPageMemberProfile = styled.div`
    width: 200px;
    height: 200px;
`

S.MyPageMemberInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray2};
    width: 198px;
    position: relative;
`

S.MyPageMemberInfoNickName = styled.div`
    ${fontSizeH6}
    ${fontWeightBold}
    margin-top: 30px;
    cursor: pointer;
`

S.MyPageMemberInfoStatusMessage = styled.div`
    ${fontSizeH9}
    ${gray5Color}
    ${fontWeightRegular}
    margin-top: 10px;
`

S.MyPageMemberInfoFollowContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 190px;
    margin: 20px 0;
    ${gray5Color}
    ${fontSizeH8}
    ${fontWeightBold}
    user-select: none; // 선택 제거
    -webkit-user-select: none; // 크롬, 사파리
    -moz-user-select: none; // 파이어폭스
    -ms-user-select: none; // IE/Edge
`

S.MyPageMemberInfoFollow = styled.div`
    display: flex;
    margin: 0 5px;
    cursor: pointer;
`

S.MyPageMemberInfoFollowCount = styled.div`
    ${mainGreenColor};
    margin-left: 2px;
    cursor: pointer;
`

S.MyPageTapContainer = styled.div`
    width: 198px;
    border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray2};
    border-top: none;
    a {
        text-decoration: none;
        ${blackColor};
        &.active {
            ${mainGreenColor};
        }
    }
`

S.MyPageTitleContainer = styled.div`
    padding: 20px 20px 10px 20px;
    ${fontSizeH6}
    ${fontWeightMedium}
`

S.MyPageTitleIcon = styled.div`
    margin-right: 5px;
`

S.MyPageTitle = styled.div`
    display: flex;
    align-items: center;
`

S.MyPageSubTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 24px;
    ${fontSizeH8}
    ${fontWeightRegular}
`

S.MyPageButtonContainer = styled.div`
    width: 200px;
    height: 40px;
`

S.FollowBtn = styled.button`
    width: 50%;
    height: 100%;
    border: none;
    ${whiteColor}
    ${fontSizeH8}
    background-color: ${({ isFollow, theme }) => 
        isFollow === 1 ? theme.PALLETE.gray.gray4 : theme.PALLETE.primary.mainGreen
    };
`

S.MessageBtn = styled.button`
    width: 50%;
    height: 100%;
    border: none;
    background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
    ${whiteColor}
    ${fontSizeH8}
`

S.ProfileCardDropdown = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 9998;
`;

S.CardBG = styled.div`
  position: fixed;
  left: 0;
  top : 0;
  width: 100vw;
  height: 100vh;
  z-index: 9000;
`

export default S;