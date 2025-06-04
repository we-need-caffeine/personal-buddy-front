import styled, { css } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, flexCenterColumn, fontSizeH10, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightLight, fontWeightRegular, lightGreenColor, mainGreenColor, pointRedColor, subGreenColor, whiteColor } from '../../../globals/common';
import { Link } from 'react-router-dom';

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


S.ItemTitle = styled.span`
    font-size: 16px;
    font-weight: 500;
    color : #222;
    margin : 0 0 8px;
`;

S.ItemAmount = styled.span`
    font-size: 14px;
    font-weight: 300;
    color : #222;
    margin: 0 0 6px 0;
`;

S.ItemDescriptionH8 = styled.span`
    ${fontSizeH8}
    ${fontWeightRegular}
`;

S.ItemDescriptionH10 = styled.span`
    font-size: 10px;
    color : #222;
    font-weight: 500;
`;

S.MyTreeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 120px;
    margin: 75px 0 65px 0;
`

S.MyTreeBackGround = styled.div`
    position: relative;
    width: 1160px;
    height: 600px;
    margin-bottom: 10px;
    border-radius: 20px;
    background-image: url(${({url}) => url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
`;

S.MyTreeItemTreeIcon = styled.div`
    position: absolute;
    width: 250px;
    height: 300px;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(${({url}) => url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 999;
    box-sizing: border-box;
`;

S.MyTreeItemStickerIcon = styled.div`
    position: absolute;
    display: inline;
    width: ${({width}) => 
        `${width}px`
    };
    height: ${({height}) => 
        `${height}px`
    };
    top: ${({yLocation}) => 
        `${yLocation}px`
    };
    left: ${({xLocation}) => 
        `${xLocation}px`
    };
    background-image: url(${({url}) => url});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: dashed 1px transparent;
    z-index: 1000;
    box-sizing: border-box;
    &:hover{
        border: dashed 3px rgb(36, 255, 84);
    }
`;

S.ButtonWrapper = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: end; 
    gap: 10px;
    margin: auto;
`;

S.SaveButton = styled.button`
    width: 85px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.primary.mainGreen};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.subGreen};
    }
`

S.CancelButton = styled.button`
    width: 85px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.warningRed};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.pointRed};
    }
`

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
    transition: all 0.1s ease;
    opacity: ${({ selected }) => (selected ? 1 : 0.8)};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: ${({selected}) => (
        selected ? `solid 5px #01CD74` : `solid 1px #EFFFF8`
    )};
    box-sizing: border-box;
    background-color: ${({appliedCount, notAppliedCount}) => (
        appliedCount == 0 ? '#EFFFF8' : notAppliedCount == 0 ? '#DDD' : '#24C394'
    )};
    border-radius: 30px;
    width: 160px;
    height: 244px;
`

S.ItemCardImg = styled.div`
    width: 90px;
    height: 90px;
    margin: 10px 0;
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

S.ItemAddButton = styled.button`
    width: 60px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.primary.subBlue};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.primary.subBlueHover};
    }
`

S.ItemRemoveButton = styled.button`
    width: 60px;
    height: 30px;
    border-radius: 50px;
    text-align: center;
    vertical-align: middle;
    background-color: ${({theme}) => theme.PALLETE.gray.gray4};
    ${whiteColor};
    border: none;
    &:hover{
        background-color: ${({theme}) => theme.PALLETE.gray.gray6};
    }
`

S.PaginationWrapper = styled.div`
    flex-basis: 100%;
    ${flexCenter}
    grid-column: 1 / -1;
    grid-row: 5;
`;

export default S;