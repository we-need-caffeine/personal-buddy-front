import styled from "styled-components";
import { blackColor, fontSizeH6, fontSizeH7, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightMedium, fontWeightRegular, gray2Color, gray4Color, gray6Color, mainGreenColor, pointRedColor, subBlueColor, whiteColor } from "../../../globals/common";

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
    display: flex;
    justify-content: left;

    & span {
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
    align-items: end;
    ${fontSizeH6}
    ${blackColor}
    ${fontWeightRegular}
    margin: 0 0 40px 0;

    & > span {
        display: flex;
        font-size: 30px;
        font-weight: 700;
        color: #222;
    }
`

S.TitleTopLinkText = styled.div`
    &:hover {
        ${mainGreenColor}
    }
    font-size: 16px;
    font-weight: 300;
    color: #666;
    padding-bottom: 3px;
`

S.TreeContainer = styled.div`
    width: 100%;
    height: 600px;
    margin-top: 35px;
`

S.MyTreeBackGround = styled.div`
    pointer-events: none;
    position: relative;
    width: 1160px;
    height: 600px;
    margin-bottom: 10px;
    border-radius: 20px;
    background-image: url(${({url}) => url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
`;

S.MyTreeItemTreeIcon = styled.div`
    position: absolute;
    width: 250px;
    height: 300px;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${({url}) => url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 999;
    box-sizing: border-box;
`;

S.GuestBookTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin : 80px 0 15px 0;
    ${fontWeightBold}
`

S.GuestBookTitle = styled.div`
    padding-right: 10px;
    ${blackColor}


    & span {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 18px;
        font-weight: 500;
    }
`

S.GuestBookWriteCount = styled.div`
    padding-left: 10px;
    ${subBlueColor}
`

S.GuestBookInputContainer = styled.div`
    ${fontWeightBold}
`

S.GuestBookInputTitle = styled.div`
    ${fontSizeH6}
    padding: 30px 30px 10px 30px;
`

S.GuestBookInput = styled.textarea`
    font: inherit;
    resize: none;
    outline: none;
    caret-color: auto;
    width: 1118px;
    height: 80px;
    padding: 20px;
    border-radius: 20px;
    ${fontSizeH7}
    border: 1px solid #ccc;
    color: #666;
    font-weight: 300;
    font-size: 16px;
`
S.GuestBookInputBottomContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding-top: 15px;
    ${fontSizeH6}
    ${gray2Color}
    ${fontWeightBold}
`

S.GuestBookInputButton = styled.button`
    text-align: center;
    border: none;
    border-radius: 50px;
    width: 120px;
    height: 44px;
    margin-left: 10px;
    ${whiteColor}
    font-weight: 500;
    font-size: 16px;
    background-color: ${({ $isActive, theme }) => 
        $isActive ? theme.PALLETE.primary.subBlue : theme.PALLETE.gray.gray3};
        
    cursor: ${({ $isActive }) => $isActive ? 'pointer' : 'default'};

    &:disabled {
        cursor: not-allowed;
    }
`

S.GuestBookInputCount = styled.div`
    padding-right: 5px;
    ${blackColor}
`

S.GuestBookListContainer = styled.div`
    width: 1160px;
    margin-top: 102px;
    margin-bottom: 50px;
    border-top: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
`

S.GuestBookItemContainer = styled.div`
    width: 1118px;
    border-bottom: solid 1px #eee;
    padding: 40px 20px;
`

S.GuestBookMemberInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

S.GuestBookMemberInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    flex-shrink: 0;
    font-weight: 500;
    color: #222;
    margin: 5px 10px 0 6px;
    /* 멤버 프로필 카드 고정용 */
    position: relative;
    margin: 0 0 12px 0;
`

S.GuestBookMemberProfileImg = styled.img`
    object-fit: cover;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
`

S.GuestBookDeleteButton = styled.button`
    ${pointRedColor}
    ${fontSizeH7}
    ${fontWeightRegular}
    background: none;
    border: none;
`

S.GuestBookContent = styled.div`
    font-size: 18px;
    font-weight: 300;
    color: #000;
    white-space: pre-wrap;
    word-break: break-word;
    margin: 5px 0 30px 0;
`

S.GuestBookCreateTime = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
    color: #999999;
    font-size: 13px;
`

//------------------------ [ 드롭다운 스타일 ]
S.ProfileCardDropdown = styled.div`
  position: fixed;
  z-index: 11000;
`;

//------------------------ [ 카드 백그라운드 스타일 ]
S.CardBG = styled.div`
  position: fixed;
  left: 0;
  top : 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
`

export default S;