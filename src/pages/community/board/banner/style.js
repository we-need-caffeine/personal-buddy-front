// src/pages/main/community/board/banner/style.js

import styled from 'styled-components';
import {
  flexCenter,
  fontSizeH4,
  fontSizeH8,
  fontWeightBold,
  fontWeightRegular,
} from '../../../../globals/common';

const S = {};

S.HotWrapper = styled.div`
  width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

S.MainTitle = styled.div`
  ${fontSizeH4}
  ${fontWeightBold}
  color: black;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 55px;
`;

S.HotContainer = styled.div`
  width: 1400px;
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 0 0 60px 0;
`;

S.HotBtnLeft = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
  ${flexCenter}
`;

S.HotBtnRight = styled(S.HotBtnLeft)``;

S.Hot = styled.div`
  overflow: hidden;
  width: 1160px;
  position: relative;
  margin: auto;
`;

S.HotSlider = styled.div`
  display: flex;
  gap: 100px;
  width: max-content;
  height: 100%;
  transition: transform 0.5s ease;

`;

S.HotContent = styled.div`
  flex-shrink: 0;
  width: 320px;
  height: 670px;
  display: flex;
  flex-direction: column;
`;

S.HotImageBox = styled.div`
  position: relative;
  display: inline-block;
  background: #e8eaed;
  border-radius: 20px;

  .img {
    width: 320px;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    background: #e8eaed;
  }
`;

S.NumberBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #009dcc;
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 28px;
  border-radius: 20px 0 20px 0;
  ${flexCenter}
`;

S.HotTag = styled.div`
  ${flexCenter}
  width: 86px;
  height: 24px;
  font-size: 14px;
  color: #616161;
  background: #f6f7f8;
  border-radius: 5px;
  text-align: center;
  margin-top: 15px;
  padding-top: 4px;
`;

S.HotTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #424242;
  padding: 14px 0 18px 0;
`;

S.HotUserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  margin-bottom: 10px;
`;

S.UserProfile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

S.UserNickname = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #808080;
`;

S.HotDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #808080;
  padding-bottom: 5px;
`;

S.HotMetaBox = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #808080;
  display: flex;
  gap: 10px;

  .icon {
    width: 10px;
    height: 10px;
    margin-right: 3px;
  }
`;

export default S;
