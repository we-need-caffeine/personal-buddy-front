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
    font-size: 18px;
    font-weight: 300;
    color: #666;
    padding-bottom: 3px;
    margin: 0 0 6px 0;
`;

S.MainTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin-top: 1px;
    text-align: left;
`;

S.PostListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 80px 40px;
    justify-content: center; 
`;

S.PostCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isComingSoon'
})`
    width: 560px; 
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    background-color: #fff;
    overflow: hidden;
    margin: 0 0 25px 0;

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
    padding: 0 0 0 16px;

    div:first-child {
        font-size: 24px;
        margin: 0 0 50px 0;
        font-weight: 500;
        color: #222;
    }

    div:last-child {
        font-size: 16px;
        font-weight: 300;
        margin: 0 0 8px 0;
        color: #999;
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
