import React from 'react';
import S from './style';

const Target = () => {
    const dailyGoals = [
        { label: '', currentCount: 1, standardCount : 1, getPoint: '10', completed: true },
        { label: '운동', currentCount: 1, standardCount : 1, getPoint: '30', completed: true },
        { label: '공부', currentCount: 0, standardCount : 1, getPoint: '40', completed: false },
        { label: '모임', currentCount: 0, standardCount : 1, getPoint: '20', completed: false },
        { label: '업무', currentCount: 0, standardCount : 1, getPoint: '20', completed: false },
    ];

    const weeklyGoals = [
        { label: '', currentCount: 3, standardCount : 5, getPoint: '100', completed: false },
        { label: '운동', currentCount: 3, standardCount : 5, getPoint: '300', completed: false },
        { label: '여가', currentCount: 0, standardCount : 5, getPoint: '400', completed: false },
        { label: '건강', currentCount: 0, standardCount : 5, getPoint: '200', completed: false },
        { label: '여행', currentCount: 0, standardCount : 5, getPoint: '200', completed: false },
    ];

    const monthlyGoals = [
        { label: '', currentCount: 3, standardCount : 20, getPoint: '200', completed: false },
        { label: '운동', currentCount: 3, standardCount : 20, getPoint: '600', completed: false },
        { label: '모임', currentCount: 0, standardCount : 20, getPoint: '400', completed: false },
        { label: '약속', currentCount: 0, standardCount : 20, getPoint: '400', completed: false },
        { label: '공부', currentCount: 0, standardCount : 20, getPoint: '800', completed: false },
    ];

    const checkIcon = (completed) =>
        completed ? "/assets/images/contents/target/icons/target-complete.png" : "/assets/images/contents/target/icons/target-notcomplete.png";

    return (
        <div>
            <S.SubTitle>기간별 포인트 획득을 확인해보세요!</S.SubTitle>
            <S.MainTitle>포인트 획득 💸</S.MainTitle>
            <S.TargetBox>
                <S.TargetList location="left">
                    <S.DescriptionTitle>일간 목표</S.DescriptionTitle>
                    <ul style={{ listStyle: 'none', margin: '20px 0 0 0', width: '100%' }}>
                        {dailyGoals.map((dailyGoal, i) => (
                            <S.TargetListItem key={i}>
                                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                    <S.TargetListIcon src={checkIcon(dailyGoal.completed)} />
                                    <S.Description targetCompleted={dailyGoal.completed}>{dailyGoal.label} 일정 등록 ( {dailyGoal.currentCount} / {dailyGoal.standardCount} )</S.Description>
                                </div>
                                <div>
                                    <S.DescriptionGetPoint>{dailyGoal.getPoint} </S.DescriptionGetPoint>
                                    <S.Description style={{margin: '0 105px 0 0'}}>획득</S.Description>
                                </div>
                            </S.TargetListItem>
                        ))}
                    </ul>
                </S.TargetList>

                <S.TargetList>
                    <S.DescriptionTitle>주간 목표</S.DescriptionTitle>
                    <ul style={{ listStyle: 'none', margin: '20px 0 0 0', width: '100%' }}>
                        {weeklyGoals.map((weeklyGoal, i) => (
                            <S.TargetListItem key={i}>
                                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                    <S.TargetListIcon src={checkIcon(weeklyGoal.completed)} />
                                    <S.Description targetCompleted={weeklyGoal.completed}>{weeklyGoal.label}  일정 등록 ( {weeklyGoal.currentCount} / {weeklyGoal.standardCount} )</S.Description>
                                </div>
                                <div>
                                    <S.DescriptionGetPoint>{weeklyGoal.getPoint} </S.DescriptionGetPoint>
                                    <S.Description style={{margin: '0 105px 0 0'}}>획득</S.Description>
                                </div>
                            </S.TargetListItem>
                        ))}
                    </ul>
                </S.TargetList>

                <S.TargetList location="right">
                    <S.DescriptionTitle>월간 목표</S.DescriptionTitle>
                    <ul style={{ listStyle: 'none', margin: '20px 0 0 0', width: '100%' }}>
                        {monthlyGoals.map((monthlyGoal, i) => (
                            <S.TargetListItem key={i}>
                                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                                    <S.TargetListIcon src={checkIcon(monthlyGoal.completed)} />
                                    <S.Description targetCompleted={monthlyGoal.completed}>{monthlyGoal.label} 일정 등록 ( {monthlyGoal.currentCount} / {monthlyGoal.standardCount} )</S.Description>
                                </div>
                                <div>
                                    <S.DescriptionGetPoint>{monthlyGoal.getPoint} </S.DescriptionGetPoint>
                                    <S.Description style={{margin: '0 105px 0 0'}}>획득</S.Description>
                                </div>
                            </S.TargetListItem>
                        ))}
                    </ul>
                </S.TargetList>
            </S.TargetBox>
        </div>
    );
};

export default Target;