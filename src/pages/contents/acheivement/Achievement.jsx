import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Achievement = () => {
    
    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;
    const [achievements, setAchievements] = useState([]);
    
    useEffect(() => {
        if(!memberId) return;

        const getMemberAchievements = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/achievements/api/achievement/${memberId}`)

            const datas = await response.json();
            setAchievements(datas);
            return datas;
        }

        getMemberAchievements();
    },[memberId])

    return (
        <div>
            <S.SubTitle>프로필을 멋지게 장식해봐요!</S.SubTitle>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <S.MainTitle>업적 목록 🎖️</S.MainTitle>
                <S.Link to={`/main/mypage/${memberId}/achievement`}>👉🏻 프로필 설정하러 가기</S.Link>
            </div>
            <S.AchievementListBox>
            {
                achievements.map((achievement, i) => (
                    <S.AchievementCard isDisplayed={achievement.memberAchievementDisplay == 1}>
                    <S.AchievementIcon 
                    $src={`${process.env.REACT_APP_BACKEND_URL}/files/api/display?filePath=${achievement.achievementImgPath}&fileName=${encodeURIComponent(achievement.achievementImgName)}`}
                        $isCompleted={achievement.achievementCompleted == 1}
                        alt='/assets/images/contents/achievement/icons/achievement-default.png'/>
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
                                ({achievement.achievementCurrentMissionCount} / {achievement.achievementMissionCount})
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