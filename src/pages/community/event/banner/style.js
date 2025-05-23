import styled from 'styled-components';
import { flexCenter, fontSizeH4, fontSizeH8, fontWeightBold, fontWeightRegular } from '../../../../globals/common';

const S = {};

S.BannerSliderWrapper = styled.div`
  width: 680px;
  min-height: 450px; 
  overflow: hidden;
  margin: 0 auto;
  overflow: visible;
`;

// 배너 전체 영역
S.EventWrapper = styled.div`
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

// 소제목
S.SubTitle = styled.div`
    ${fontSizeH8}
    ${fontWeightRegular}
    color: #555;
    padding-bottom: 3px;
`;

// 진행중인 이벤트 제목
S.MainTitle = styled.div`
    ${fontSizeH4}
    ${fontWeightBold}
    color: black;
    margin-top: 1px;
    text-align: left;
    padding-bottom: 30px;
`;

// Swiper 슬라이더 wrapper
S.BannerSliderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px 0;
`;

// 배너 카드 한 장
S.BannerCard = styled.div`
    width: 680px;
    height: 450px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* object-position: ${props => props.objectPosition || 'center'}; */
    }
`;


// 배너 이미지 위 텍스트박스
S.BannerTextBox = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: white;
    z-index: 2;
`;

// 배너 제목
S.BannerTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

// 배너 설명
S.BannerSub = styled.div`
    font-size: 14px;
    margin-top: 5px;
`;

export default S;
