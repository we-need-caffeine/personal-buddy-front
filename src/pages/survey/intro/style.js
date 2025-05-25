import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  flexCenterColumn,
  fontSizeH4,
  fontSizeH6,
  fontWeightMedium,
  whiteColor,
} from '../../../globals/common';

const S = {};

S.Container = styled.div`
  ${flexCenterColumn};
  width: 100vw;
  height: 100vh;
`;

S.SpeechBubble = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  ${whiteColor};
  padding: 35px;
  border-radius: 20px;
  ${fontSizeH4};
  ${fontWeightMedium};
  text-align: left;
  line-height: 45px;

  &::after {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid ${({ theme }) => theme.PALLETE.primary.mainGreen};
  }
`;

S.LogoImg = styled.img`
  width: 240px;
  height: 185px;
  margin: 50px 0;
`;

S.StartLink = styled(Link)`
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  ${whiteColor};
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  ${fontSizeH6};
  ${fontWeightMedium};

  &:hover {
    background-color: #218838;
  }
`;

export default S;
