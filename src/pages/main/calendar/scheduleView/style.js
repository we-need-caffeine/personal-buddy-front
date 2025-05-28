import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";

const S = {};

S.Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  height: 780px;
  border: 1px solid black;
`;

S.TitleInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 67px;
`;

S.MemberListContainer = styled.div`
  width: 100%;
  height: 65px;
  border-top: 1px solid black;
`;

S.TitleInput = styled.input`
  outline: none;
  border: none;
  margin-left: 32px;
  width: 100%;
  box-sizing: border-box;

  ${fontSizeH4};
`;

S.DateTextLabel = styled.span`
  ${fontSizeH8};
`;

S.DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 297px;
  border: 1px solid black;
`;

S.DateSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 476px;
  height: 231px;
`;

S.DateSection = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  width: 100%;
  height: 37px;
  ${fontSizeH8};
  ${fontWeightLight};
`;

S.DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 37px;
  gap: 100px;
`;

S.ContentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 37px;
  gap: 100px;
`;

S.CategoryInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  height: 37px;
  gap: 75px;
`;

S.ContentContainer = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 476px;
  height: 357px;
  box-sizing: border-box; 
`;

S.ContentWrapper = styled.div`
  width: 476px;
  height: calc(100% - 83px);
  ${fontSizeH8};
`;

S.CancelButton = styled.button`
position: absolute;
  bottom: 37px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 37px;
  border: none;
  color: #bbbbbb;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  background-color: white;
`;

export default S;