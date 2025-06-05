import styled, { css } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, mainGreenColor, pointRedColor, subGreenColor } from '../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

S.TitleWrap = styled.div`
    margin: 0 0 120px 0;
`

// 작은 제목
S.SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
    color: #666;
    display: flex;
    margin: 0 0 13px 0;
`;

// 메인 제목
S.MainTitle = styled.div`
    display: flex;
    font-size: 30px;
    font-weight: 700;
    color: #222;
`;

S.TargetBox = styled.div`
    ${flexCenter}
    width: 1400px;
    height: 270px;
    margin-bottom: 67px;
    margin-top: 60px;
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
    border: solid 1px #01CD74;
    border-radius: 30px;
`;

S.TargetList = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: calc(100% / 3);
    height: 240px;
    border-right: ${({location}) => (
        location === "left" ? 'dashed 1px #bbb' : 'none'
    )};
    border-left: ${({location}) => (
        location === "right" ? 'dashed 1px #bbb' : 'none'
    )};
    padding: 0 60px;
`;

S.TargetListUl = styled.ul`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    gap : 10px;
    width: 100%;
`

S.TargetListItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

S.TargetListIcon = styled.img`

`;

S.DescriptionTitle = styled.span`
    font-size: 22px;
    font-weight: 500;
    margin: 0 0 22px 0;
`;

S.AchievementDescriptionTitle = styled.span`
    font-size: 18px;
    font-weight: 500;
`;


S.Description = styled.span`
    font-size: 16px;
    font-weight: 300;
    text-decoration: ${({targetcompleted}) => (
        targetcompleted ? 'line-through' : 'none'
    )};

    ${({targetcompleted}) => (
        targetcompleted ? (subGreenColor) : '#222'
    )};
`;

S.DescriptionGetPoint = styled.span`
    ${fontSizeH8}
    ${fontWeightBold}
    ${pointRedColor}
`;

S.AchievementListBox = styled.div`
    width: 1160px;
    ${flexBaseTop}
    flex-wrap: wrap;
    gap: 120px 40px;
    padding: 120px 120px;
`;

S.AchievementCard = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 200px;
    height: 230px;
    border-radius: 20px;
    box-sizing: border-box;
    border: solid 1px #01CD74;
    background-color: ${({isDisplayed}) => (
        isDisplayed ? '#EFFFF8' : '#FFF'
    )};
`;

S.AchievementCardList = styled.ul`
    list-style: none;
    width: 80%;
    padding: 17px 0 0 0;
    margin: 17px;
    border-top: solid 1px #B9D2C7;
`;

S.AchievementCardItem = styled.li`
    display: flex;
    justify-content: baseline;
    gap: 5px;
    padding: 6px 0;
    font-weight: 300;
    font-size: 14px;
    & span {
    }
`;

S.AchievementIcon = styled.img.attrs(props => ({
        src: props.$isCompleted
            ? props.$src
            : '/assets/images/contents/achievement/icons/achievement-default.png'  // 혹은 null 로 숨기기 가능
    }))`
    position: absolute;
    top: -40px;
`;

S.Link = styled(Link)`
    font-size: 16px;
    color: #666;
    font-weight: 300;
    text-decoration: none;
    ${blackColor}
    &:hover {
        ${mainGreenColor}
    }
`;

export default S;