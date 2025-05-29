import styled from 'styled-components';

const S = {};

S.ContentWrapper = styled.div`
    width: 1400px;
    margin: 0 auto;
    height: 100%;
`

S.RecommendWrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    margin: 40px auto;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 30px;

    p {
        font-size: 24px;
        font-weight: 500;
        line-height: 35px;
        margin-bottom: 50px;
        margin-top: 100px;
    }
`

S.RecommendList = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 0;
`

S.RecommendInfo = styled.div`
    width: 320px;
    height: 400px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 10px;
    cursor: pointer;

    a {
        display: block;
        border-radius: 10px;
        overflow: hidden;
        transition: transform 0.3s ease;
    }
    span {
        font-size: 14px;
        line-height: 28px;
    }
`

S.RecommendImg = styled.img `
    width: 320px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`


export default S;