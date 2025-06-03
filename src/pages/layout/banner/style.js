import styled from 'styled-components';
import { fontWeightRegular } from '../../../globals/common';

const S = {};

S.BannerWrapper = styled.div`
    width: 100%;        
    height: 300px;
    overflow: hidden;
    position: relative;

    .swiper-slide {
      position: relative;
      width: 100%;
      height: 300px;
    }

    .swiper-slide img {
      width: 100vw;             
      height: 300px;
      object-fit: cover;
    }

    .swiper-button-prev,
    .swiper-button-next {
      color: white;
    }

    .swiper-pagination-bullet-active {
      background: #00C896;
    }
`;


S.SliderImage = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

S.bannerTitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: white;
  padding-bottom: 3px;
  margin: 0 0 6px 0;
`

S.DotsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
`;

S.Dot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#00C896' : '#ddd')};
    cursor: pointer;
    transition: background 0.3s;
`;

S.Banner1Text = styled.div`
    margin-top: 30px;
    position: absolute;
    top: 45%;
    left: 10%;
    color: white;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    margin-top: 1px;
    line-height: 1.4;
    text-align: left;
    padding-bottom: 55px;
`;

S.Banner2Text = styled.div`
    margin-top: 30px;
    position: absolute;
    top: 45%;
    left: 10%;
    color: white;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    margin-top: 1px;
    line-height: 1.4;
    text-align: left;
    padding-bottom: 55px;
`
S.Banner3Text = styled.div`
     margin-top: 30px;
    position: absolute;
    top: 45%;
    left: 10%;
    color: white;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    margin-top: 1px;
    line-height: 1.4;
    text-align: left;
    padding-bottom: 55px;
`
export default S;
