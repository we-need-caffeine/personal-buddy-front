import styled from 'styled-components';
import { fontWeightRegular } from '../../../globals/common';

const S = {};

S.BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 300px;
  margin: 0 auto;

  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
  }

  .swiper-pagination-bullet-active {
    background: #00C896 ;
  }
`;

S.SliderImage = styled.div`
  width: 1920px;
  height: 300px;
`

S.bannerTitle = styled.div`
    font-size: 17px;
    ${fontWeightRegular}
    margin-bottom: 10px;
`

S.Dot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ active }) => (active ? '#00C896' : '#ddd')};
    cursor: pointer;
    transition: background 0.3s;
`;

S.DotsContainer = styled.div`
    position: absolute; 
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
`;


S.Banner1Text = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

S.Banner2Text = styled.div`
    position: absolute;
  top: 50%;
  left: 10%;
  color: white;
  font-size: 24px;
  font-weight: bold;

`
S.Banner3Text = styled.div`
    position: absolute;
  top: 50%;
  left: 10%;
  color: white;
  font-size: 24px;
  font-weight: bold;

`
export default S;
