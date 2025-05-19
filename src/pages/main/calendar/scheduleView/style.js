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
  justify-content: space-between;
  cursor: pointer;
  ${fontSizeH8};
`;

// 전체 캘린더 저장 화면 컨테이너
S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  height: 780px;
  background-color: white;
  border: 1px solid black;
`;

export default S;
