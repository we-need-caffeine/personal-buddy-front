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
  width: 476px;
  height: 484px;
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
  align-items: center;
  width: 560px;
  height: 73px;
  border-top: 1px solid black;
  border-bottom: ${({ noBorder }) => (noBorder ? "none" : "1px solid black")};

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
  ${fontWeightRegular}
`;

S.Input = styled.input`
  ${sharedDropdownBoxStyle}
`;

S.InviteSection = styled.div`
  position: relative;
`;

S.SearchBox = styled.input`
  ${sharedDropdownBoxStyle}
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

S.ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
`;

S.DropdownName = styled.div``;

S.InviteButton = styled.div`
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

S.MemberItem = styled.div`
  display: flex;

  align-items: center;
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
export default S;
