import styled from 'styled-components';

const S = {};

// 상단 배너
S.EventWrapper = styled.div`
    width: 1400px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

S.SubTitle = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #555;
    margin-bottom: 3px;
`;

S.MainTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: black;
    margin-top: 1px;
    padding-bottom: 30px;
`;

S.BannerBox = styled.div`
    display: flex;
    gap: 20px;
`;

S.BannerCard = styled.div`
    width: 440px;
    height: 250px;
    background-color: #eee;
    border-radius: 20px;
`;

// 챌린지 리스트
S.PostSection = styled.div`
    width: 1400px;
    margin: 80px auto;
`;

S.PostList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px 30px;
`;

S.PostCard = styled.div`
    width: 360px;
    height: 234px;
    background-color: #ddd;
    border-radius: 18px;
`;

export default S;
