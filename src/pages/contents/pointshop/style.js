import styled, { css } from 'styled-components';
import { flexCenter, flexCenterColumn, fontSizeH10, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, lightGreenColor, gray4Color, mainGreenColor, pointRedColor, subGreenColor, whiteColor, gray6Color, subBlueColor, blackColor, fontWeightLight, fontSizeH3, fontSizeH5 } from '../../../globals/common';
import { Link } from 'react-router-dom';
import theme from '../../../globals/theme';

const S = {};

// 작은 제목
S.SubTitle = styled.div`
    ${fontSizeH8}
    ${fontWeightRegular}
    color: #555;
`;

// 메인 제목
S.MainTitle = styled.div`
    ${fontSizeH4}
    ${fontWeightBold}
    color: black;
    margin-top: 3px;
    margin-bottom: 40px;
    text-align: left;
`;

S.DescriptionPoint = styled.span`
    ${fontSizeH8}
    ${fontWeightBold}
    ${pointRedColor}
`;

S.Link = styled(Link)`
    display: inline-block;
    margin-top: 5px;
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
    margin-top: 50px;
    border: solid 1px ${({theme}) => theme.PALLETE.primary.mainGreen};
    border-radius: 5px 5px 0 0;
    ${fontSizeH6};
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
        ${whiteColor};
    };
`;

S.ItemCardListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(150px, 1fr));
  grid-template-rows: 1fr 1fr 1fr 1fr 40px;
  /* grid-template-rows: repeat(4, minmax(234px, 1fr)); */
  gap: 40px 40px; /* row-gap column-gap */
  width: 1400px;
  height: 1300px;
  padding: 30px 110px 30px 110px;
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
    ${flexCenter}
    grid-column: 1 / -1;
    grid-row: 5;
`;

export default S;