import styled from 'styled-components';
import { flexCenter, flexCenterColumn, fontSizeH1, fontSizeH4, fontWeightBold} from '../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

S.Container = styled.div`
    ${flexCenterColumn}
    width: 100%;
`;

S.VideoWrapper = styled.div`
    ${flexCenterColumn}
    position: relative;
    border: none;
    width: 1920px;
`;

S.Video = styled.video`
    border: none;
    width: 100%;
`

S.LoginLink = styled(Link)`
    position: absolute;
    ${flexCenter}
    width: 200px;
    height: 100px;
    border: none;
    border-radius: 30px;
    background-color: ${({backgroundColor}) => backgroundColor};
    color: ${({color}) => color};
    left: ${({xPosition}) => xPosition};
    top: ${({yPosition}) => yPosition};
    ${fontWeightBold}
    ${fontSizeH4}
    &:hover{
        background-color: ${({hoverBackgroundColor}) => hoverBackgroundColor}
    };
    z-index: 1000;
    
`

S.Title = styled.h1`
    font-size: 50px;
    margin-bottom: 20px;
    color: #333;
`;

S.Subtitle = styled.p`
    font-size: 20px ;
    color: #666;
`;

S.MusicInfo = styled.div`
    position: absolute;
    left: 1200px;
    top: 90px;
    margin-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 16px;
    color: #131313;
    z-index: 999;
`;

S.MusicButton = styled.button`
    font-size: 16px;
    padding: 5px 10px;
    background: none;
    border-radius: 10px;
    border: solid 2px #131313;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        background-color: #131313;
        color: white;
    }
`;

S.MuteButton = styled.button`
    font-size: 20px;
    background: none;
    border-radius: 10px;
    cursor: pointer;
    border: solid 2px #131313;

    &:hover {
        background-color: #131313;
        color: white;
    }

`;

export default S;
