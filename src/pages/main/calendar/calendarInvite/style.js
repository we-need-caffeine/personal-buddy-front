import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";

const S = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
`;

S.Title = styled.h2`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 700;
`;

S.Description = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
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

S.Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
`;

export default S;
