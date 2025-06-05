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
    /* cursor: pointer; */

    a {
        display: block;
        border-radius: 10px;
        overflow: hidden;
        transition: transform 0.3s ease;
    }
`

S.RecommendImg = styled.img `
    width: 320px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
    cursor: pointer;
    margin: 0 0 30px 0;

    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`

S.SubTitle = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    margin: 0 0 13px 0;
`

S.MainTitle = styled.span`
    display: flex;
    font-size: 30px;
    font-weight: 700;
    color: #222;
    margin: 0 0 40px 0;
`


S.ItemTitleWrap = styled.div`
    display: flex;
    margin : 0 0 8px 0;
    align-items: center;
`

S.ItemTitle = styled.span`
    font-size: 18px;
    font-weight: 500;
    margin: 0 12px 0 0;
`

S.ItemSubTitle = styled.span`
    font-size: 18px;
    font-weight: 300;
    margin: 0 0 0 6px;
`



export default S;