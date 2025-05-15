import styled, { css } from 'styled-components';
import { flexCenter } from '../../globals/common';

const S = {};

S.TabBox = styled.div`
  ${flexCenter}
  margin-bottom: 95px;
  margin-top: 79px;
`;

S.TabContainer = styled.div`
  position: relative;
  width: 560px;
  height: 55px;
  background: #eeeeee;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0;
`;

S.TabBtn = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: #01cd74;
  border-radius: 30px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
`;

S.TabText = styled.div`
  ${flexCenter}
  width: 50%;
  height: 100%;
  z-index: 2;

  a {
    font-size: 20px;
    font-weight: bold;
    color: ${({ isSelected }) => (isSelected ? '#999' : '#000')};
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }
`;

export default S;
