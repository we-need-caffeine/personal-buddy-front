import styled from "styled-components";
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";

const S = {};

// 공통 인풋 박스 스타일
const sharedDropdownBoxStyle = `
  width: 191px;
  height: 37px;
  padding-left: 12px;
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

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 560px;
  height: 780px;
  background: white;
  border: 1px solid black;
  box-sizing: border-box;
`;

S.ContentContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
  width: 476px;
  height: 558px;
`;

S.TitleContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 476px;
  height: 73px;
`;

S.Title = styled.div`
  ${fontSizeH4};
`;

S.RowContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  width: 560px;
  height: 73px;
  border-top: 1px solid black;
  border-bottom: ${({ $noBorder }) => ($noBorder ? "none" : "1px solid black")};
`;

S.Row = styled.div`
  box-sizing: border-box;
  width: 476px;
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Label = styled.div`
  ${fontWeightRegular};
`;

S.Input = styled.input`
  ${sharedDropdownBoxStyle};
`;

S.InviteSection = styled.div`
  position: relative;
`;

S.SearchBox = styled.input`
  ${sharedDropdownBoxStyle};
`;

S.Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  max-height: 250px;
  z-index: 10;
  overflow-y: auto;
`;

S.DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

S.Left = styled.div`
  display: flex;
  align-items: center;
`;

S.DropdownName = styled.div`
  margin-left: 8px;
`;

S.MemberImage = styled.img`
 width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

S.InviteButton = styled.div`
  color: #00c851;
  font-weight: 500;
`;

S.RemoveButton = styled.div`
  color: #00c851;
  font-weight: 500;
`;
S.MemberList = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 12px;
`;

S.MemberListTitle = styled.div`
  display: flex;
  flex-direction: center;
`;

S.MemberInfoContainer = styled.div`
  display: flex ;
  align-items: center;
`;

S.MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.MemberName = styled.div`
  margin-left: 12px;
`;

S.HostBadge = styled.div`
  color: #ff6b00;
  font-weight: bold;
`;

S.ButtonGroup = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  bottom: 37px;
  align-items: end;
  justify-content: space-between;
  gap: 8px;
  background-color: white;
`;

// 공통 버튼 (저장, 삭제, 취소 모두 여기로 통합)
S.ActionButton = styled.button`
  width: 102px;
  height: 37px;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  background-color: ${({ $type, disabled }) =>
    disabled ? "#d9d9d9" : 
    $type === "danger" ? "#ff4d4f" :
    $type === "primary" ? "#01cd74" : "white"};

  color: ${({ $type, disabled }) =>
    disabled ? "white" :
    $type === "danger" || $type === "primary" ? "white" : "#bbbbbb"};

  border: ${({ $type, disabled }) =>
    disabled ? "none" :
    $type === "default" || !$type ? "1px solid #bbbbbb" : "none"};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
export default S;
