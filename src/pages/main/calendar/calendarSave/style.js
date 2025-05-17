import styled from "styled-components";

const S = {};

// 전체 캘린더 저장 화면 컨테이너
S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  height: 780px;
  background-color: pink;
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
  margin-left: 5px;
  width: 100%;
  box-sizing: border-box;
`;

// 날짜 입력 영역
S.DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 176px;
  background-color: orange;
`;

S.DateSectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 476px;
  height: 90px;
  background-color: yellow;
`;

S.DateSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 37px;
  background-color: red;
`;

S.DateInputWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 37px;
  gap: 40px;
  background-color: beige;
`;

S.DateInput = styled.input`
  height: 100%;
  width: 200px;
  background-color: blue;
  box-sizing: border-box;
`;

S.DateInputTime = styled.input`
  height: 100%;
  width: 80px;
  background-color: blue;
  box-sizing: border-box;
`;

// 내용 작성 영역
S.ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 538px;
  background-color: purple;
`;

S.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 17px;
  width: 476px;
  height: 488px;
  background-color: yellow;
`;

S.ContentFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  width: 476px;
  height: 413px;
  background-color: pink;
`;

S.ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 37px;
  background-color: red;
`;

S.ContentRowInput = styled.input`
  height: 100%;
  width: 320px;
  background-color: blue;
  box-sizing: border-box;
`;

S.ContentRowTextInput = styled.input`
  height: 100%;
  width: 320px;
  background-color: blue;
  box-sizing: border-box;
`;

S.ContentCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 320px;
  gap: 10px;
`;

S.Select = styled.select`
  width: 150px;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 14px;
`;

S.ContentRowTextArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 143px;
  background-color: red;
`;

S.ContentTextAreaWrapper = styled.div`
  display: flex;
  width: 477px;
  height: 143px;
  background-color: green;
`;

S.Select = styled.select`
  width: 320px;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: white;
  border: 1px solid #ccc;
  font-size: 14px;
`;

S.ButtonGroup = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 222px;
  height: 37px;
  background-color: white;
`;

S.Button = styled.button`
  width: 102px;
  height: 32px;
  background-color: aquamarine;
  border-radius: 10px;
`;

export default S;