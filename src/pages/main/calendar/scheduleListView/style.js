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
S.DateInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 67px;
  background-color: white;
  border-bottom: 1px solid black;
`;

S.DateInput = styled.input`
  outline: none;
  border: none;
  margin-left: 39px;
  width: 100%;
  box-sizing: border-box;
  ${fontSizeH4};
`;

// 내용 작성 영역
S.ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 560px;
  height: 675px;
`;

S.ScheduleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 486px;
  height: 58px;
  padding-left: 36px;
  padding-right: 36px;
  
  &:hover {
    background-color: #eeeeee; 
    cursor: pointer;
  }
`;

S.Circle = styled.div`
  border-radius: 50%;
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color || "blue"};
`;

S.TitleInputContainer = styled.div`
  ${fontSizeH8};
`;

S.TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  width: fit-content;
  height: 100%;
`;

S.Time = styled.div`
  display: flex;
  ${fontSizeH8};
  align-items: center;
  width: fit-content;
  height: 100%;
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


export default S;
