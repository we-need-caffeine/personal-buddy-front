import styled, { css } from 'styled-components';
import { blackColor, flexBaseTop, flexCenter, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, mainGreenColor, pointRedColor, subGreenColor } from '../../../globals/common';
import { Link } from 'react-router-dom';

const S = {};

// 작은 제목
S.SubTitle = styled.div`
    ${fontSizeH8}
    ${fontWeightRegular}
    color: #555;
`;

// 메인 제목
S.MainTitle = styled.div`
    ${fontSizeH4}
    ${fontWeightBold}
    color: black;
    margin-top: 3px;
    text-align: left;
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
        location == "left" ? 'dashed 1px #000' : 'none'
    )};
    border-left: ${({location}) => (
        location == "right" ? 'dashed 1px #000' : 'none'
    )};
`;

S.TargetListItem = styled.li`
    display: flex;
    margin-left: 80px;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 14px;
`;

S.TargetListIcon = styled.img`

`;

S.DescriptionTitle = styled.span`
    ${fontSizeH6}
    ${fontWeightBold}
`;

S.Description = styled.span`
    ${fontSizeH8}
    ${fontWeightRegular}
    text-decoration: ${({targetcompleted}) => (
        targetcompleted ? 'line-through' : 'none'
    )};

    ${({targetcompleted}) => (
        targetcompleted ? (subGreenColor) : '#000'
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
    gap: 40px;
    padding: 0 120px;
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
    vertical-align: baseline;
    margin-top: 140px;
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
    font-size: 14px;
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
    text-decoration: none;
    ${blackColor}
    &:hover {
        ${mainGreenColor}
    }
`;

export default S;