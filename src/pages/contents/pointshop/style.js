import styled, { css } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, flexCenterColumn, fontSizeH10, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, lightGreenColor, mainGreenColor, pointRedColor, subGreenColor, whiteColor } from '../../../globals/common';
import { Link } from 'react-router-dom';

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
  grid-template-rows: repeat(4, minmax(234px, 1fr));
  gap: 40px 40px; /* row-gap column-gap */
  width: 1400px;
  height: 1300px;
  padding: 90px 110px;
  margin-top: -1px;
  background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
  border: solid 1px ${({ theme }) => theme.PALLETE.primary.mainGreen};
  box-sizing: border-box;
  align-content: start;
`;

S.ItemCard = styled.div`
    transition: all 0.1s ease;
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
    background-color: ${lightGreenColor};
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
`

S.ItemCardButtonWrapper = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: center;
    gap: 5px;
`;

S.PaginationWrapper = styled.div`
    ${flexCenter}
    grid-column: 1 / -1;
    grid-row: 5;
`;

export default S;