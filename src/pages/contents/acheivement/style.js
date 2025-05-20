import styled, { css } from 'styled-components';
import { flexBaseTop, flexCenter, fontSizeH4, fontSizeH6, fontSizeH8, fontWeightBold, fontWeightRegular, pointRedColor, subGreenColor } from '../../../globals/common';

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
    text-decoration: ${({targetCompleted}) => (
        targetCompleted ? 'line-through' : 'none'
    )};

    ${({targetCompleted}) => (
        targetCompleted ? (subGreenColor) : '#000'
    )};
`;

S.DescriptionGetPoint = styled.span`
    ${fontSizeH8}
    ${fontWeightBold}
    ${pointRedColor}
`;

S.AchievementListBox = styled.div`
    width: 1160px;
    background-color: ${({ theme }) => theme.PALLETE.primary.lightGreen};
    ${flexBaseTop}
    flex-wrap: wrap;
    gap: 40px;
    padding: 0 120px;
`;

S.AchievementCard = styled.div`
    ${flexCenter}
    position: relative;
    flex-direction: column;
    width: 200px;
    height: 230px;
    border-radius: 20px;
    box-sizing: border-box;
    border: solid 1px #01CD74;
    vertical-align: baseline;
    margin-top: 140px;
`;

S.AchievementIcon = styled.img`
    position: absolute;
    top: -40px;
`;




export default S;