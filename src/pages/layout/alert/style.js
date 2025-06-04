import styled, { keyframes } from "styled-components";
import { fontSizeH8, fontSizeH9, fontWeightBold, pointRedColor, whiteColor } from "../../../globals/common";

const S = {};

const fadeInUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

S.Backdrop = styled.div`
  position: fixed;
  left: 0; 
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
`

S.AlartContainer = styled.div`
  background-color: ${({ theme }) => theme.PALLETE.white};
  width: 400px;
  height: 480px;
  border-radius: 20px;
  overflow: hidden;
  ${fontSizeH8}
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.1s ease-out;
  z-index: 10002;
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
  margin: 20px 25px;
`;

S.SelectBox = styled.select`
  &:focus {
    outline: none;
  }
  width: 100px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  ${fontSizeH8}
  border: 1px solid ${({ theme }) => theme.PALLETE.gray.gray4};
`;

S.DeleteAllButton = styled.span`
  background: none;
  border: none;
  ${pointRedColor}
  ${fontWeightBold}
  ${fontSizeH8}
  cursor: pointer;
`;

S.ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 25px;
  height: 350px;
  padding-bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

S.ListItem = styled.div`
  display: flex;
  align-items: center;
`;

S.ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-fit: cover;
  margin-right: 8px;
`;

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 32px;
  flex-grow: 1;
`;

S.Nickname = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

S.Message = styled.div`
  font-size: 13px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: block;
`;

S.Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 32px;
  text-align: right;
`;

S.Time = styled.span`
  font-size: 12px;
  color: #999;
`;

S.Delete = styled.div`
  ${fontSizeH9}
  ${pointRedColor}
  cursor: pointer;
`;

export default S;