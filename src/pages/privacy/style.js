// style.js
import styled from 'styled-components';
import { mainGreenColor } from '../../globals/common';

const S = {};

S.Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 80px 20px;
    line-height: 1.8;
    color: #333;
    font-size: 16px;
`;

S.Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 40px;
    text-align: center;
    color: #222;
`;

S.SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-top: 32px;
    margin-bottom: 16px;
    color: #111;
`;

S.Paragraph = styled.p`
    margin-bottom: 20px;
    white-space: pre-line; // 줄바꿈 유지
`;

S.BackButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    display: flex;
    text-align: right;
    margin-top: 80px;
    margin-left: auto;
    margin-bottom: 24px;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        ${mainGreenColor} 
    }
`;


export default S;
