// src/pages/main/community/event/banner/style.js

import styled from 'styled-components';
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightBold,
  fontWeightRegular,
} from '../../../../globals/common';

const S = {};

// 전체 이벤트 배너 영역
S.EventWrapper = styled.div`
  width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

// 소제목 (예: BUDDYGROUND)
S.SubTitle = styled.div`
  ${fontSizeH8}
  ${fontWeightRegular}
  color: #555;
  padding-bottom: 3px;
`;

// 메인 타이틀 (예: 진행중인 이벤트)
S.MainTitle = styled.div`
  ${fontSizeH4}
  ${fontWeightBold}
  color: black;
  margin-top: 1px;
  text-align: left;
  padding-bottom: 30px;
`;

// Swiper 전체 wrapper
S.BannerSliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  & .swiper-slide {
    width: 680px !important;
    height: 450px !important;
  }
`;

// 배너 카드 1장
S.BannerCard = styled.div`
  position: relative;
  width: 680px;
  height: 450px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 배너 이미지 위 텍스트 영역 (옵션: 제목/설명 등)
S.BannerTextBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  z-index: 2;
`;

S.BannerTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

S.BannerSub = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

export default S;
