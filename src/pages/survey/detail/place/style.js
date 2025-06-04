import styled from 'styled-components';
import {
  fontSizeH4,
  fontSizeH6,
  fontWeightMedium,
  whiteColor,
  gray6Color,
  flexCenter,
  flexCenterColumn,
  pointRedColor,
} from '../../../../globals/common';

const S = {};

S.Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

S.Left = styled.div`
  ${flexCenterColumn}
  width: 800px;
  padding: 0 100px;
`;

S.Right = styled.div`
  ${flexCenterColumn}
  width: 800px;
  padding: 0 100px;
`;

S.SpeechBubble = styled.div`
  width: 480px;
  height: 135px;
  position: relative;
  background-color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
  ${whiteColor}
  padding: 35px;
  border-radius: 20px;
  ${fontSizeH4}
  ${fontWeightMedium}
  line-height: 45px;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid ${({ theme }) => theme.PALLETE.primary.mainGreen};
  }
`;

S.LogoImg = styled.img`
  width: 240px;
  height: 185px;
  margin-top: 50px;
`;

S.RightWrapper = styled.div`
  width: 560px;
  height: 553px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.MainTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 12px 0;
`;

S.SubTitle = styled.div`
    margin-left: 42px;
    font-weight: 400;
    font-size: 16px;

  span {
    ${pointRedColor}
  }
`;

S.Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  overflow: hidden;
`;

S.Tag = styled.span`
    padding: 8px 16px;
    border-radius: 50px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 300;
    margin-top: 11px;
    margin-right: 11px;
    cursor: pointer;
    border: 1px solid #ccc;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
  }

  &.selected {
    background-color: ${({ theme }) => theme.PALLETE.primary.subGreen};
    color: ${({ theme }) => theme.PALLETE.white};

    &:hover {
      background-color: ${({ theme }) => theme.PALLETE.primary.subGreen};
    }
  }
`;



S.NextBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 28px;
`;



S.NextBtn = styled.button`
  background-color: ${({ theme }) => theme.PALLETE.primary.subGreen};
  width: 157px;
  height: 43px;
  color: ${({ theme }) => theme.PALLETE.white};
  border: none;
  ${fontSizeH6}
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
`;

S.PrevBtn = styled(S.NextBtn)`
  background-color: #BBBBBB;
`;

export default S;
