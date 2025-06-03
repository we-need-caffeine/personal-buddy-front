import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
  fontSizeH6,
} from "../../../../globals/common";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #eeeeee;
  padding: 20px;
`;

S.ContentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
width: 560px;
height: 170px;
border-radius: 20px;
gap: 20px;
`;

S.Title = styled.h2`
  ${fontSizeH4}
  ${fontWeightRegular}
`;

S.Description = styled.p`
  ${fontSizeH6}
`;

S.ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

S.ApproveButton = styled.button`
  padding: 12px 24px;
  background-color: #01cd74;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #00b667;
  }
`;

S.RejectButton = styled.button`
  padding: 12px 24px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;

S.BuddyLogo = styled.img`
  transform: scale(0.7);

`;



S.Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
`;

export default S;
