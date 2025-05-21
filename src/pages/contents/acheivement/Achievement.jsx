import React, { useEffect } from 'react';
import S from './style';
import { useSelector } from 'react-redux';

const Achievement = () => {
    
    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;

    const achievements = S.achievementsDummy;
    useEffect(() => {
        const getAchievements = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/achievements/api/achievement/list`)

            const data = await response.json();
            console.log(data);
        }

        const getMemberAchievements = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/achievements/api/achievement/${memberId}`)

            const data = await response.json();
            console.log(data);
        }

        getAchievements();
        getMemberAchievements();
    },[])

    return (
        <div>
            <S.SubTitle>프로필을 멋지게 장식해봐요!</S.SubTitle>
            <S.MainTitle>업적 목록 🎖️</S.MainTitle>
            <S.AchievementListBox>
            {
                achievements.map((achievement, i) => (
                    <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>{achievement.achievementName}</S.DescriptionTitle>
                        <S.AchievementCardList>
                            <S.AchievementCardItem>
                                <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' />
                                {achievement.achievementScheduleCategory} 일정 등록
                            </S.AchievementCardItem>
                            <S.AchievementCardItem>
                                <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' />
                                {achievement.achievementMissionCount} 회 등록 시 달성
                            </S.AchievementCardItem>
                            <S.AchievementCardItem>
                                <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' />
                                (0 / {achievement.achievementMissionCount})
                            </S.AchievementCardItem>
                            <S.AchievementCardItem>
                                <img src='/assets/images/contents/achievement/icons/achievement-check-ok.png' />
                                완료 시 
                                <S.DescriptionGetPoint>
                                    {achievement.achievementGetPoint}P
                                </S.DescriptionGetPoint>
                                획득
                            </S.AchievementCardItem>
                        </S.AchievementCardList>
                    </S.AchievementCard>
                ))
            }
            </S.AchievementListBox>
        </div>
    );
};

export default Achievement;