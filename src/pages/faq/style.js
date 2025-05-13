import styled from 'styled-components';
import { fontSizeH8, fontWeightThin } from '../../globals/common';

const S = {};

S.Section = styled.section`
  max-width: 700px;
  margin: 60px auto;
  padding: 0 16px;
  color: #000;
`;

S.Title = styled.h2`
  font-size: 32px;
  text-align: center;
  font-weight: 400;
  margin-bottom: 116px;
`;

S.Wrapper = styled.div`
`;

S.SubLabel = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
`;

S.SubTitle = styled.h4`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 60px;
`;

S.List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.Item = styled.li`
  border-bottom: 1px solid #ddd;
`;

S.Header = styled.div`
  display: flex;
  align-items: center;
  height: 86px;
  padding: 0 8px;
  gap: 12px;
  cursor: pointer;
`;

S.Q = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #01cd74;
`;

S.Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  flex-grow: 1;
`;

S.Icon = styled.img`
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  transform: ${(t) => (t.rotate ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

S.Answer = styled.div`
  padding: 16px 12px;
  font-size: 14px;
  ${fontSizeH8};
  ${fontWeightThin};
  line-height: 1.6;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  white-space: pre-line;
`;

export default S;