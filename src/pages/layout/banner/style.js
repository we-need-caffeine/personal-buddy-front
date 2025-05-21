import styled from 'styled-components';

const S = {};

S.BannerWrapper = styled.div`
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
    background: #00C896;
  }
`;

export default S;
