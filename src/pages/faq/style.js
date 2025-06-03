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
    font-size: 18px;
    font-weight: 300;
    color: #666;
    padding-bottom: 3px;
    margin: 0 0 6px 0;
`;

S.SubTitle = styled.h4`
  font-size: 30px;
  font-weight: 700;
  color: #222;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 55px;
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
  font-weight: 700;
  color: #01cd74;
`;

S.Text = styled.span`
  font-size: 24px;
  font-weight: 300;
  color: #222;
`;

S.Icon = styled.img`
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  transform: ${(t) => (t.rotate ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

S.Answer = styled.div`
  padding: 16px 12px 40px 12px;
  font-size: 14px;
  ${fontSizeH8};
  ${fontWeightThin};
  line-height: 1.6;
  border-top: 1px solid #ddd;
  white-space: pre-line;
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7;
`;

export default S;