import styled, { css } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, flexCenterColumn, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, mainGreenColor, pointRedColor, subGreenColor, whiteColor } from '../../../globals/common';
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

export default S;