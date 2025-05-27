import styled from 'styled-components';
import { flexCenter, fontSizeH4, fontSizeH8, fontWeightBold, fontWeightRegular,  } from '../../../../globals/common';

const S = {};

S.PostSection = styled.div`
    width: 1400px;
    margin: 80px auto;
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
    gap: 36px 28px;
`;

S.PostCard = styled.div`
  width: 440px; 
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  background-color: #fff;
  overflow: hidden;
`;


S.ImageBox = styled.div`
    position: relative;
    width: 100%;
    height: 250px;

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

export default S;
