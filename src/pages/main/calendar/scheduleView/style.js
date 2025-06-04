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
  border-top: 1px solid #01CD74;
  border-right: 1px solid #01CD74;
  border-bottom: 1px solid #01CD74;
`;

S.TitleInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid #01CD74;
`;

S.MemberListContainer = styled.div`
  gap: 20px;
  
  display: flex;
  align-items: center;
  width: 476px;
  height: 80px;

`;

S.TitleInput = styled.input`
  outline: none;
  border: none;
  margin-left: 32px;
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
`;

S.DateTextLabel = styled.span`
  display: flex;
  flex-shrink: 0;
  width: 154px;
  font-size: 16px;
  font-weight: 500;
`;

S.DateText = styled.span`
  font-size: 14px;
  font-weight: 300;
`;

S.DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 297px;
  border: 1px solid #01cd74;
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
  align-items: center;
  width: 100%;
  height: 37px;
  ${fontSizeH8};
  ${fontWeightLight};

  & div {
    display: flex;
    width: 200px;
    justify-content: space-between;
  }
`;

S.DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 37px;
`;

S.ContentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 37px;
`;

S.CategoryInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 37px;
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
S.ButtonGroup = styled.div`
  position: absolute;
  bottom: 37px;
  right: 0px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 222px;
  height: 37px;
  background-color: white;
`;

S.DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 37px;
  border: none;
  color: white;
  border-radius: 10px;
  background-color: #FF3F3F;
`;

S.CancelButton = styled.button`
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
S.MemberItem = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

S.MemberImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

S.MemberName = styled.div`
  font-size: 14px;
`;
export default S;