import styled from 'styled-components';

const S = {};

S.PlaceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
`;

S.PlaceRecommend = styled.div`
    width: 1421px;
    margin: 60px auto 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

S.PlaceList = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
`;

S.PlaceItem = styled.div`
    display: flex;
    align-items: center;
    padding: 22px;
    border-radius: 10px;
    width: 650px;
    height: 135px;
    position: relative;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
`;

S.PlaceHover = styled.div`
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 70%;
    background: #4CAF50;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    ${S.PlaceItem}:hover &,
    ${S.PlaceItem}.active & {
        opacity: 1;
    }
`;

S.PlaceItemImg = styled.img`
    width: 180px;
    height: 135px;
    object-fit: cover;
    border-radius: 10px;
    margin-left: 12px;

    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`;

S.PlaceInfo = styled.div`
    margin-left: 15px;
    flex: 1;
`;

S.PlaceDetails = styled.div`
    width: 680px;
    height: auto;
    max-height: 520px;
    background-color: #f5f5f5;
    border-radius: 10px;
    display: none;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    top: 0;
    bottom: 0;

    &.active {
        display: flex;
        width: 680px;
        height: 520px;
    }
`;

S.PlaceDetailsImg = styled.img`
    width: 90%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
`;

S.PlaceTitle1 = styled.h2`
    font-size: 24px;
    font-weight: 500;
    line-height: 35px;
    margin-bottom: 50px;
    margin-top: 100px;
`;

export default S;
