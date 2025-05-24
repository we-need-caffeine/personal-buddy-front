import styled from 'styled-components';
import { flexCenter} from '../../globals/common';

const S = {};

S.Container = styled.div`
    height: 100vh;
    ${flexCenter};
    flex-direction: column;
    background: linear-gradient(to right,rgb(255, 255, 255),rgb(198, 228, 204));
    cursor: pointer;
    position: relative;
`;

S.Img = styled.img`
    ${flexCenter}
    padding: 30px;
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
    margin-top: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 16px;
    color: #444;
`;

S.MusicButton = styled.button`
    font-size: 16px;
    padding: 5px 10px;
    background: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        background-color: black;
        color: white;
    }
`;

S.MuteButton = styled.button`
    font-size: 20px;
    background: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: black;
        color: white;
    }

`;

export default S;
