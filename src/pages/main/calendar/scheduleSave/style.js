import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";

const S = {};

// 공통 드롭다운 박스 스타일
const sharedDropdownBoxStyle = `
  height: 37px;
  padding: 0 12px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #FAFAFA;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${fontSizeH8};
`;

// 전체 캘린더 저장 화면 컨테이너
S.Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  height: 780px;
  background-color: white;
  border: 1px solid black;
`;

// 제목 입력 영역
S.TitleInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 67px;
  background-color: white;
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

// 날짜 입력 영역
S.DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 176px;
  border: 1px solid black;
`;

S.DateSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 476px;
  height: 90px;
`;

S.DateSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 37px;

  ${fontSizeH8};
  ${fontWeightLight}
`;

S.DateInputWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 37px;
  gap: 40px;
`;

S.DateInput = styled.input`
  height: 100%;
  width: 200px;
  border: none;
  outline: none;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
`;

S.DateInputTime = styled.input`
  height: 100%;
  width: 80px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #fafafa;
  box-sizing: border-box;
`;

// 내용 작성 영역
S.ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 538px;
`;

S.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 17px;
  width: 476px;
  height: 488px;
  ${fontSizeH8};
`;

S.ContentFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  width: 476px;
  height: 413px;
`;

S.ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 37px;
  
  ${fontWeightLight}
`;

S.ContentRowInput = styled.input`
  height: 100%;
  width: 320px;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: #fafafa;
  border-radius: 10px;
  ${fontWeightLight}
  ${fontSizeH8};
`;

S.ContentRowTextInput = styled.input`
  height: 100%;
  width: 320px;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  border: none;
  background-color: #fafafa;
  ${fontSizeH8};
`;

S.ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 12px;
  border: 1px solid #ccc;
`;

S.ContentCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 320px;
  gap: 10px;
`;

S.Select = styled.select`
  width: 320px;
  height: 100%;
  padding: 5px 12px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #fafafa;
  font-size: 14px;
  ${fontSizeH8};
  ${fontWeightLight}
  appearance: none;
`;

S.ContentRowTextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 143px;
  ${fontWeightLight}
`;

S.ContentTextAreaWrapper = styled.div`
  display: flex;
  width: 477px;
  height: 143px;
`;

S.ButtonGroup = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 222px;
  height: 37px;
  background-color: white;
`;

S.SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 37px;
  border: none;
  color: white;
  border-radius: 10px;
  background-color: #01cd74;
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

S.MemberDropdownContainer = styled.div`
  position: relative;
  width: 320px;
`;

S.MemberSelectBox = styled.div`
 ${sharedDropdownBoxStyle}
  ${fontWeightLight}
`;

S.MemberWrapper = styled.div`
  display: flex;
  align-items: center;
`;

S.MemberDropdownList = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  z-index: 10;
`;

S.MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

S.ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
`;

S.MemberName = styled.div`
  ${fontSizeH8};
`;

S.CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ checked }) => (checked ? "#00C851" : "transparent")};
  border: 2px solid #00c851;
`;

// 커스텀 드롭다운
S.CustomDropdownContainer = styled.div`
  position: relative;
  width: 150px;
`;

S.CustomDropdownSelectBox = styled.div`
  ${sharedDropdownBoxStyle}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  `}
`;

S.CustomDropdownList = styled.ul`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.CustomDropdownItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  ${fontSizeH8};

  &:hover {
    background-color: #f9f9f9;
  }
`;

S.TimeDropdownContainer = styled.div`
  position: relative;
  width: 100px;
`;

S.TimeBox = styled.div`
  height: 37px;
  background-color: #fafafa;
  border: none;
  order: none;
  border-radius: 10px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
`;

S.TimeList = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
`;

S.TimeItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default S;
