import styled from "styled-components";
import { blackColor, fontSizeH8, fontSizeH9, fontWeightBold, fontWeightLight, fontWeightRegular, gray5Color, pointRedColor, whiteColor } from "../../../globals/common";

const S = {};

S.ChatRoomContainer = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  width: 400px;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  ${fontSizeH8}
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

S.TitleContainer = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.primary.subBlue};
  ${whiteColor}
  height: 40px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Title = styled.div`
  margin: 0;
`;

S.CloseButton = styled.img`
  cursor: pointer;
`;

S.TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 25px 5px 25px;
`;

S.SelectBox = styled.select`
  width: 100px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  ${fontSizeH8}
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 240px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
  border-radius: 5px;
`;

S.SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  padding-left: 8px;
`

S.SearchInput = styled.textarea`
  border: none;
  font: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  ${fontSizeH8}
  ${fontWeightRegular}
  width: 100%;
  height: 100%;
  padding: 6px;
  border-radius: 5px;
`

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  padding-bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`

S.ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 0 25px;
  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.gray.gray2}
  }
`

S.MemberInfoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

S.MemberImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

S.MemberInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 2px;
  padding-left: 8px;
`

S.MemberStatusContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
`

S.MemberNickName = styled.span`
  ${fontSizeH8}
  ${blackColor}
  ${fontWeightRegular}
`

S.UnReadCount = styled.span`
  ${fontSizeH9}
  ${pointRedColor}
  ${fontWeightRegular}
`

S.MemberFavoriteImg = styled.img`
  width: 14px;
  height: 13px;
  position: relative;
  top: -1px;
`

S.MemberStatusMessage = styled.span`
  ${fontSizeH9}
  ${gray5Color}
  ${fontWeightRegular}
`

S.RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 2px;
`

S.LastChatDate = styled.span`
  ${fontWeightLight}
  ${gray5Color}
  ${fontSizeH9}
`

S.OutChatRoom = styled.span`
  cursor: pointer;
  ${fontSizeH9}
  ${fontWeightBold}
  ${pointRedColor}
`

S.ProfileCardDropdown = styled.div`
    position: absolute;
    top: 40px;
    left: 0px;
    z-index: 10003;
`;

S.CardBG = styled.div`
    position: fixed;
    left: 0;
    top : 0;
    width: 100vw;
    height: 100vh;
    z-index: 10002;
`

S.ChatLogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px 25px 25px;
  height: 295px;
  overflow-y: auto;
  overflow-x: hidden;
`

S.LeftChat = styled.div`
  max-width: 240px;
  max-height: 240px;
  display: flex;
  align-items: start;
  justify-content: left;
`

S.LeftMemberImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

S.LeftTextContainer = styled.div`
  margin-left: 10px;
`

S.LeftNickName = styled.div`
  ${blackColor}
  ${fontSizeH9}
  ${fontWeightRegular}
`

S.LeftContent = styled.div`
  ${blackColor}
  ${fontSizeH9}
  ${fontWeightRegular}
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
  border-radius: 5px;
  margin-top: 5px;
`

S.RightChat = styled.div`
  display: flex;
  justify-content: right;
`

S.RightContent = styled.div`
  ${blackColor}
  ${fontSizeH9}
  ${fontWeightRegular}
  padding: 10px;
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  border-radius: 5px;
  margin-top: 5px;
`

S.ChatInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
`

S.ChatInput = styled.textarea`
  border: none;
  font: inherit;
  resize: none;
  outline: none;
  box-sizing: border-box;
  ${fontSizeH8}
  ${fontWeightRegular}
  width: 350px;
  height: 80px;
  border-radius: 5px;
  padding: 10px;
  padding-right: 100px;
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
  overflow: hidden;
`

S.SendButton = styled.button`
  position: absolute;
  right: 35px;
  bottom: 10px;
  ${whiteColor}
  width: 60px;
  height: 30px;
  ${fontWeightBold}
  ${fontSizeH8}
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray3};
`

export default S;