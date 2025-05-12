import styled from 'styled-components';
import { flexCenterColumn, mainGreenColor } from '../../globals/common';

const S = {};

S.Container = styled.div`
  ${flexCenterColumn}; // common style 적용 - import해서 경로 확인후 사용하십셔
  background-color: #FCF8F3;
  height: 100vh;
`;

S.Image = styled.img`
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  height: auto;
  object-fit: cover;
`;

S.BackButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.h2}; // theme font-size 적용
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold}; // theme font-weight 적용
  color: ${({ theme }) => theme.PALLETE.black}; // theme color 사용
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    ${mainGreenColor};
  }
`;

export default S;