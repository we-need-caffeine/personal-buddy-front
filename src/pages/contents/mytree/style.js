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
    text-align: left;
`;


S.ItemDescriptionH8 = styled.span`
    ${fontSizeH8}
    ${fontWeightRegular}
`;

S.ItemDescriptionH10 = styled.span`
    ${fontSizeH10}
    ${fontWeightRegular}
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
    background-image: url("/assets/images/contents/tree/item/background/default-background.png");
    z-index: 0;
`;

S.MyTreeItemTreeIcon = styled.div`
    position: absolute;
    width: 250px;
    height: 300px;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url("/assets/images/contents/tree/item/tree/default-tree.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 999;
    box-sizing: border-box;
`;

S.MyTreeItemStickerIcon = styled.div`
    position: absolute;
    display: inline;
    width: 60px;
    height: 60px;
    top: ${({yLocation}) => 
        `${yLocation}px`
    };
    left: ${({xLocation}) => 
        `${xLocation}px`
    };
    background-image: url("/assets/images/contents/tree/item/sticker/minipin.png");
    background-size: cover;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
    background-color: ${({appliedCount, notAppliedCount}) => (
        appliedCount == 0 ? '#EFFFF8' : notAppliedCount == 0 ? '#DDD' : '#24C394'
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

export default S;