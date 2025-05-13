import styled from 'styled-components';
import { fontSizeH6, fontSizeH8, fontSizeH9, fontWeightLight, gray5Color, mainGreenColor } from '../../../globals/common';

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
`

S.MyPageMemberInfoNickName = styled.div`
    ${fontSizeH6};
    margin-top: 30px;
`

S.MyPageMemberInfoStatusMessage = styled.div`
    ${fontSizeH9};
    ${gray5Color};
    margin-top: 10px;
`

S.MyPageMemberInfoFollowContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 190px;
    margin: 20px 0;
    ${gray5Color};
    ${fontSizeH8};
    ${fontWeightLight}
`

S.MyPageMemberInfoFollow = styled.div`
    display: flex;
    margin: 0 5px;
`

S.MyPageMemberInfoFollowCount = styled.div`
    ${mainGreenColor};
    margin-left: 2px;
`

S.MyPageTapContainer = styled.div`
    width: 198px;
    border: solid 1px ${({ theme }) => theme.PALLETE.gray.gray2};
    border-top: none;
`

S.MyPageTitleContainer = styled.div`
    padding: 20px 20px 10px 20px;
    ${fontSizeH6};
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
    ${fontSizeH8};
`
export default S;