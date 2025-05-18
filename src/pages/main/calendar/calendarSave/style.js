import styled from "styled-components";

const S = {};


S.Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: 780px;
  background: white;
  border: 1px solid #eee;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
`;

S.Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

S.Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
`;

S.Label = styled.div`
  width: 120px;
  font-size: 16px;
  font-weight: bold;
`;

S.Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eee;
  background-color: #fafafa;
`;

S.InviteSection = styled.div`
  flex: 1;
  position: relative;
`;

S.SearchBox = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eee;
  background-color: #fafafa;
`;

S.Dropdown = styled.div`
  margin-top: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  max-height: 250px;
  overflow-y: auto;
`;

S.DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

S.ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 12px;
`;

S.DropdownName = styled.div`
  flex: 1;
`;

S.InviteButton = styled.div`
  color: #00c851;
  font-weight: 500;
`;

S.MemberList = styled.div`
  margin-top: 24px;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 8px;
`;

S.MemberListTitle = styled.div`
  font-weight: bold;
  margin-bottom: 16px;
`;

S.MemberItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

S.MemberName = styled.div`
  margin-left: 12px;
  flex: 1;
`;

S.HostBadge = styled.div`
  color: #ff6b00;
  font-weight: bold;
`;

S.DeleteButton = styled.button`
  margin-top: 32px;
  width: 120px;
  height: 48px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;
`;

export default S;



