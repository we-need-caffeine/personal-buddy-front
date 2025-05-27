import styled from 'styled-components';
import { flexCenter, fontSizeH4, fontSizeH8, fontWeightBold, fontWeightRegular, pointRedColor,  } from '../../../../globals/common';

const S = {};

S.PostSection = styled.div`
    width: 1400px;
    margin: 80px auto;
    width: 100%;
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

S.SubTitle = styled.div`
    ${fontSizeH8}
    ${fontWeightRegular}
    color: #555;
    margin-bottom: 3px;
`;

S.MainTitle = styled.div`
    ${fontSizeH4}
    ${fontWeightBold}
    color: black;
    margin-top: 1px;
    padding-bottom: 30px;
`;

S.PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 175px 36px;
    justify-content: center; 
`;

S.PostCard = styled.div`
    width: 560px; 
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    background-color: #fff;
    overflow: hidden;

      ${({ isComingSoon }) => isComingSoon && `
        opacity: 0.6;
        filter: grayscale(50%);
        pointer-events: none;
    `}
`;


S.ImageBox = styled.div`
    position: relative;
    width: 100%;
    height: 344px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

S.BadgeComingSoon = styled.div`
    position: absolute;
    top: 12px;
    left: 12px;
    background-color: #777;
    color: white;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 10px;
    border-radius: 12px;
`;

S.BadgeComplete = styled.div`
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #009dcc;
    color: white;
    font-size: 13px;
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 12px;
`;

S.InfoBox = styled.div`
    padding: 16px;
    font-size: 15px;

    div:first-child {
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 16px;
    }

    div:last-child {
            color: #888;
            font-size: 14px;
    }
`;

S.ComingSoonOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(85, 85, 85, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 20px;
    font-weight: bold;
    z-index: 2;
    border-radius: 20px;
`;

export default S;
