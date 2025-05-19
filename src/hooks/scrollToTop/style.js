import styled from 'styled-components';

const S = {};

S.TopButton = styled.button`
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    background-color: #00c853;  // 초록색
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 999;
    display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s;
`;

// 원 안 삼각형
S.Triangle = styled.div`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;  
    border-right: 10px solid transparent;
    border-bottom: 14px solid black;      
`;

export default S;
