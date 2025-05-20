import React from 'react';
import S from './style';

const Achievement = (memberId) => {
    
    return (
        <div>
            <S.SubTitle>프로필을 멋지게 장식해봐요!</S.SubTitle>
            <S.MainTitle>업적 목록 🎖️</S.MainTitle>
            <S.AchievementListBox>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>알쓰</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>CHILL GUY</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>LITTLE BOY</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>나도 개츠비</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>나도 로니 콜먼</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>나도 아인슈타인</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>득근 왕</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>무거운 엉덩이</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>비상한 두뇌</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>스터디 스타터</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>중고 트레이너</S.DescriptionTitle>
                </S.AchievementCard>
                <S.AchievementCard>
                    <S.AchievementIcon src='/assets/images/contents/achievement/icons/achievement-default.png'/>
                    <S.DescriptionTitle>헬린이</S.DescriptionTitle>
                    
                </S.AchievementCard>
                
            </S.AchievementListBox>
        </div>
    );
};

export default Achievement;