import styled from 'styled-components';

const S = {};

S.PostGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 80px;
`;

S.PostCard = styled.div`
    width: 320px;
    height: 600px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

S.Thumbnail = styled.img`
    width: 320px;
    height: 420px;
    object-fit: cover;
    border-radius: 20px;
    background: #E8EAED;
`;

S.Tag = styled.span`
    width: 75px;
    height: 24px;
    font-size: 14px;
    color: #616161;
    background: #F6F7F8;
    border-radius: 5px;
    text-align: center;
    margin-top: 15px;
    padding-top: 4px;
`;

S.Title = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: #424242;
    padding: 14px 0 18px 0;
`;

S.UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    margin-bottom: 10px;
`;

S.ProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

S.Nickname = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #808080;
`;

S.Date = styled.span`
    font-size: 12px;
    font-weight: 300;
    color: #808080;
    padding-bottom: 5px;
`;

S.MetaInfo = styled.div`
    font-size: 12px;
    font-weight: 300;
    color: #808080;
    display: flex;
    gap: 10px;
`;

export default S;
