import React from 'react';
import S from './style';

const Target = ({
    dailyRandomTargets, 
    weeklyRandomTargets, 
    monthlyRandomTargets, 
    dailyTargets, 
    weeklyTargets, 
    monthlyTargets
}) => {
    const dailyRandomCategory = dailyRandomTargets.map(randomTarget => randomTarget.randomTargetLotteryCategory)
    const filteredDailyTargets = dailyTargets.filter(target => target.targetType == null || dailyRandomCategory.includes(target.targetType))

    const weeklyRandomCategory = weeklyRandomTargets.map(randomTarget => randomTarget.randomTargetLotteryCategory)
    const filteredWeeklyTargets = weeklyTargets.filter(target => target.targetType == null || weeklyRandomCategory.includes(target.targetType))

    const monthlyRandomCategory = monthlyRandomTargets.map(randomTarget => randomTarget.randomTargetLotteryCategory)
    const filteredMonthlyTargets = monthlyTargets.filter(target => target.targetType == null || monthlyRandomCategory.includes(target.targetType))

    const checkIcon = (completed) =>
        completed ? "/assets/images/contents/target/icons/target-complete.png" : "/assets/images/contents/target/icons/target-notcomplete.png";

    return (
        <div>
            <S.SubTitle>기간별 포인트 획득을 확인해보세요!</S.SubTitle>
            <S.MainTitle>포인트 획득 💸</S.MainTitle>
            <S.TargetBox>
                <S.TargetList location="left">
                    <S.DescriptionTitle>일간 목표</S.DescriptionTitle>
                    <S.TargetListUl>
                        {
                            filteredDailyTargets.map((dailyTarget, i) => (
                                <S.TargetListItem key={i}>
                                    <div>
                                        <S.TargetListIcon src={checkIcon(dailyTarget.isCompleted)} />
                                        <S.Description targetcompleted={dailyTarget.isCompleted}>{dailyTarget.targetType} 일정 등록 ( {dailyTarget.completedCount} / {dailyTarget.standardCount} )</S.Description>
                                    </div>
                                    <div>
                                        <S.DescriptionGetPoint>{dailyTarget.targetGetPoint} 🪙 </S.DescriptionGetPoint>
                                        <S.Description>획득</S.Description>
                                    </div>
                                </S.TargetListItem>
                            ))
                        }
                    </S.TargetListUl>
                </S.TargetList>

                <S.TargetList>
                    <S.DescriptionTitle>주간 목표</S.DescriptionTitle>
                    <S.TargetListUl>
                        {
                            filteredWeeklyTargets.map((weeklyTarget, i) => (
                                <S.TargetListItem key={i}>
                                    <div>
                                        <S.TargetListIcon src={checkIcon(weeklyTarget.isCompleted)} />
                                        <S.Description targetcompleted={weeklyTarget.isCompleted}>{weeklyTarget.targetType}  일정 등록 ( {weeklyTarget.completedCount} / {weeklyTarget.standardCount} )</S.Description>
                                    </div>
                                    <div>
                                        <S.DescriptionGetPoint>{weeklyTarget.targetGetPoint} 🪙 </S.DescriptionGetPoint>
                                        <S.Description>획득</S.Description>
                                    </div>
                                </S.TargetListItem>
                            ))
                        }
                    </S.TargetListUl>
                </S.TargetList>

                <S.TargetList location="right">
                    <S.DescriptionTitle>월간 목표</S.DescriptionTitle>
                    <S.TargetListUl>
                        {
                            filteredMonthlyTargets.map((monthlyTarget, i) => (
                                <S.TargetListItem key={i}>
                                    <div>
                                        <S.TargetListIcon src={checkIcon(monthlyTarget.isCompleted)} />
                                        <S.Description targetcompleted={monthlyTarget.isCompleted}>{monthlyTarget.targetType} 일정 등록 ( {monthlyTarget.completedCount} / {monthlyTarget.standardCount} )</S.Description>
                                    </div>
                                    <div>
                                        <S.DescriptionGetPoint>{monthlyTarget.targetGetPoint} 🪙 </S.DescriptionGetPoint>
                                        <S.Description>획득</S.Description>
                                    </div>
                                </S.TargetListItem>
                            ))
                        }
                    </S.TargetListUl>
                </S.TargetList>
            </S.TargetBox>
        </div>
    );
};

export default Target;