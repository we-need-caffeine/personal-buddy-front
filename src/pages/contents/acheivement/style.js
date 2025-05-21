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

S.AchievementIcon = styled.img`
    position: absolute;
    top: -40px;
`;

// 임시 더미용 데이터
S.achievementsDummy = [
        {
            achievementName: "알쓰", 
            achievementScheduleCategory: "모임", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "알쓰.png",
            achievementGetPoint: 30,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "헬린이", 
            achievementScheduleCategory: "운동", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "헬린이.png",
            achievementGetPoint: 50,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "스터디 스타터", 
            achievementScheduleCategory: "공부", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "스터디 스타터.png",
            achievementGetPoint: 100,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "중고 트레이너", 
            achievementScheduleCategory: "운동", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "중고 트레이너.png",
            achievementGetPoint: 150,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "CHILL GUY", 
            achievementScheduleCategory: "모임", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "CHILL GUY.png",
            achievementGetPoint: 100,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "무거운 엉덩이", 
            achievementScheduleCategory: "공부", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "무거운 엉덩이.png",
            achievementGetPoint: 300,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "TOM BOY", 
            achievementScheduleCategory: "모임", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "TOM BOY.png",
            achievementGetPoint: 200,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "득근 왕", 
            achievementScheduleCategory: "운동", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "득근 왕.png",
            achievementGetPoint: 300,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "나도 개츠비", 
            achievementScheduleCategory: "모임", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "나도 개츠비.png",
            achievementGetPoint: 400,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "비상한 두뇌", 
            achievementScheduleCategory: "공부", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "비상한 두뇌.png",
            achievementGetPoint: 400,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "나도 로니 콜먼", 
            achievementScheduleCategory: "운동", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "나도 로니 콜먼.png",
            achievementGetPoint: 600,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
        {
            achievementName: "나도 아인슈타인", 
            achievementScheduleCategory: "공부", 
            achievementImgPath: "C:\personalbuddy\images\achievement",
            achievementImgName: "나도 아인슈타인.png",
            achievementGetPoint: 900,
            achievementMissionCount: 10,
            memberAchievementDisplay: 0
        },
    ]



export default S;