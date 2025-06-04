import styled, { css } from 'styled-components';
import { flexCenter, flexCenterColumn, fontSizeH10, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, lightGreenColor, gray4Color, mainGreenColor, pointRedColor, subGreenColor, whiteColor, gray6Color, subBlueColor, blackColor, fontWeightLight, fontSizeH3, fontSizeH5, flexBaseTop, fontWeightMedium } from '../../../globals/common';
import { Link } from 'react-router-dom';
import theme from '../../../globals/theme';
import { Swiper as SwiperCore, SwiperSlide as SwiperSlideCore } from 'swiper/react';

const S = {};

// 작은 제목
S.SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    margin: 0 0 13px 0;
`;

// 메인 제목
S.MainTitle = styled.div`
    display: flex;
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin: 0 0 40px 0;
`;

S.PointShopInfoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border: 1px solid ${({theme}) => theme.PALLETE.primary.mainGreen};
    background-color: ${({theme}) => theme.PALLETE.primary.lightGreen};
    width: 1360px;
    height: 150px;
`

S.MemberInfoWrapper = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    gap: 30px;
    width: 15%;
    height: 150px;
    background-color: white;
    padding: 0 20px;
    border-top: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
    border-bottom: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
    border-left: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
`;

S.CartButtonWrapper = styled.div`
    ${flexCenterColumn}
    gap: 20px;
    flex-shrink: 0;
    width: 10%;
    height: 150px;
    background-color: white;
    padding: 0 20px;
    margin-left: -1px;
    margin-right: -1px;
    border-top: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
    border-bottom: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
    border-right: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
`


S.ShowCartButton = styled.button`
    width: 130px;
    height: 50px;
    border-radius: 10px;
    padding : 0 0 0 50px;
    text-align: left;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.primary.subBlue};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.subBlueHover};
    }
    background-image: url("/assets/images/contents/pointshop/cart.png");
    background-repeat: no-repeat;
    background-size: 25px;
    background-position-x: 15px;
    background-position-y: center;
`;

S.CartAddAllButton = styled.button`
    width: 130px;
    height: 50px;
    border-radius: 10px;
    padding : 0 0 0 50px;
    text-align: left;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.gray.gray4};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.gray.gray6};
    }
    background-image: url("/assets/images/contents/pointshop/bag.png");
    background-repeat: no-repeat;
    background-size: 25px;
    background-position-x: 15px;
    background-position-y: center;
`;

S.SelectedItemInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    background-color: white;
    margin-left: -1px;
    border: 1px solid ${({theme}) => theme.PALLETE.primary.subGreen};
    border-left: 1px dashed ${({theme}) => theme.PALLETE.primary.subGreen};
    
    .swiper-button-prev,
    .swiper-button-next {
        color: ${({ theme }) => theme.PALLETE.primary.mainGreen};
    }

    .swiper-button-prev {
        left: -50px;
    }

    .swiper-button-next {
        right: -50px;
    }
`;

S.SelectedItemList = styled(SwiperCore)`
    width: 100%;
    max-width: 800px;
    padding: 20px 20px;
`;

S.PrevButton = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
    border: none;
    border-radius: 100%;
    top: 50%;
    left: 20px; 
    transform: translateY(-50%);
    z-index: 10;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.subGreen};
    }
    background-image: url("/assets/images/contents/pointshop/prev.png");
    background-repeat: no-repeat;
    background-position: center;
    background-position: -2px;
    background-size: 30px;
`;

S.NextButton = styled.button`
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: ${({theme}) => theme.PALLETE.primary.subGreen};
    border: none;
    border-radius: 100%;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 10;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
    }
    background-image: url("/assets/images/contents/pointshop/next.png");
    background-repeat: no-repeat;
    background-position: 2px;
    background-size: 30px;
`;

S.SelectItemInfo = styled(SwiperSlideCore)`
  position: relative;
  width: 100px !important;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px;
  border: 1px dashed ${({ theme }) => theme.PALLETE.primary.mainGreen};
  background-color: #9df3ce;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);

    ${() => S.SelectItemCancelButton} {
      opacity: 1;
    }
  }
`;

S.SelectItemCancelButton = styled.button`
  position: absolute;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.PALLETE.gray.gray4};
  background-image: url("/assets/images/contents/pointshop/cancel.png");
  background-size: contain;
  background-repeat: no-repeat;

  &:hover {
    background-color: ${({ theme }) => theme.PALLETE.gray.gray6};
  }
`;

S.SelectItemCardWrap = styled.div`
`

S.SelectItemCard = styled.div`
    ${flexCenter}
    gap: 10px;
    flex: 1;

    & img {
        max-height: 60px;
        max-width: 60px;
    }
`

S.SelectItemCount = styled.div`
    ${flexCenterColumn}
    background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
    width: 20px;
    height: 20px;
    border-radius: 100%;
    ${fontSizeH8}
    ${fontWeightBold}
    ${whiteColor}
`

S.InfoTitleText = styled.span`
    font-weight: 500;
    font-size: 18px;

    & span {
        font-weight: 300;
    }
`;

S.InfoDescText = styled.span`
    font-size: 16px;
    font-weight: 500;
`;

S.DescriptionPoint = styled.span`
    font-size: 18px;
    ${fontWeightBold}
    ${pointRedColor}
`;

S.Link = styled(Link)`
    display: inline-block;
    ${fontSizeH8}
    ${fontWeightLight}
    text-decoration: none;
    &:hover {
        ${mainGreenColor}
    }
`;


S.ItemDescriptionH8 = styled.span`
    ${fontSizeH8}
    ${fontWeightRegular}
`;

S.ItemDescriptionH10 = styled.span`
    ${fontSizeH10}
    ${fontWeightRegular}
`;


S.ItemTabBox = styled.div`
    display: flex;
    justify-content: baseline;
    gap : 5px;
    border: none;
`;

S.ItemTabLink = styled(Link)`
    ${flexCenterColumn}
    background-color: ${({ selected }) => (selected ? '#01CD74' : '#EFFFF8')};
    color: ${({ selected }) => (selected ? '#EFFFF8' : '#01CD74')};
    width: 80px;
    height: 35px;
    margin-top: 60px;
    border: solid 1px ${({theme}) => theme.PALLETE.primary.mainGreen};
    border-radius: 5px 5px 0 0;
    ${fontSizeH6};
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
        ${whiteColor};
    };
`;

S.ItemCardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 40px; /* row-gap column-gap */
  width: 1400px;
  max-height: 1200px;
  overflow: hidden;
  padding: 30px 119px;
  margin-top: -1px;
  background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
  border: solid 1px ${({ theme }) => theme.PALLETE.primary.mainGreen};
  box-sizing: border-box;
  align-content: start;
`;

S.ItemCard = styled.div`
    transition: all 0.2s ease;
    opacity: ${({ selected }) => (selected ? 1 : 0.8)};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 10px;
    border: ${({selected}) => (
        selected ? `solid 5px #01CD74` : `solid 1px #EFFFF8`
    )};
    box-sizing: border-box;
    background-color: ${({isOwned}) => (
        isOwned ? theme.PALLETE.gray.gray2 : theme.PALLETE.primary.lightGreen
    )};
    border-radius: 30px;
    width: 150px;
    height: 234px;
`

S.ItemCardImg = styled.div`
    width: 100px;
    height: 100px;
    margin: 10px;
    background-image: url(${({url}) => url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

S.ItemCountWrapper = styled.div`
    ${flexCenter}
    gap: 15px;
`;

S.ItemCountButton = styled.button`
    ${flexCenter}
    font-size: 12px;
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 100%;
    background-color: ${({theme}) => theme.PALLETE.gray.gray};

    &:hover{
        background-color: ${({theme}) => theme.PALLETE.gray.gray2};
    }
`;

S.ItemCardButtonWrapper = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: center;
    gap: 5px;
`;

S.ItemInfoWrapper = styled.div`
    ${flexCenterColumn}
    gap: 5px;
`;

S.ItemBuyButton = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.primary.subBlue};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.subBlueHover};
    }
`;

S.ItemCartAddButton = styled.button`
    width: 60px;
    height: 25px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.gray.gray4};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.gray.gray6};
    }
`;

S.ItemPreviewButton = styled.button`
    width: 80px;
    height: 15px;
    border-radius: 50px;
    text-decoration: underline;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.primary.lightGreen};
    ${gray6Color};
    border: none;
    &:hover{
        ${subBlueColor}
    }
`;

S.PaginationWrapper = styled.div`
    flex-basis: 100%;
    ${flexCenter}
    grid-column: 1 / -1;
    grid-row: 5;
`;

export default S;