import React, { useEffect, useState } from 'react';
import Achievement from './Achievement';
import Target from './Target';
import S from './style';
import { useSelector } from 'react-redux';

const AchievementContainer = () => {

    // 로그인된 유저정보
    const {currentUser} = useSelector((state) => state.member)
    // 로그인된 유저의 아이디
    const memberId = currentUser.id;

    // 선정된 랜덤 목표 가져오기
    const [dailyRandomTargets, setDailyRandomTargets] = useState([]);
    const [weeklyRandomTargets, setWeeklyRandomTargets] = useState([]);
    const [monthlyRandomTargets, setMonthlyRandomTargets] = useState([]);
    
    // 목표 완료 사항들 받아오기
    const [dailyTargets, setDailyTargets] = useState([]);
    const [weeklyTargets, setWeeklyTargets] = useState([]);
    const [monthlyTargets, setMonthlyTargets] = useState([]);

    useEffect(() => {
        if (!memberId) return;

        // 회원의 기간별 선정된 랜덤 목표 조회 
        const getRandomTargets = async () => {
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/targets/api/target/random-target/list/${memberId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dailyRandomTargets,
                        weeklyRandomTargets,
                        monthlyRandomTargets
                    })
                });
                const datas = await response.json();
                const {dailyRandomTargets: getDailyRandoms, weeklyRandomTargets: getWeeklyRandoms, monthlyRandomTargets: getMonthlyRandoms} = datas;
                
                // 데이터 추가
                setDailyRandomTargets(getDailyRandoms)
                setWeeklyRandomTargets(getWeeklyRandoms)
                setMonthlyRandomTargets(getMonthlyRandoms)
            } catch{
                console.error("Random Target 수신 중 에러");
            }
        };

        // 회원의 목표 완료 사항 조회
        const getTargets = async () => {
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/targets/api/target/list/${memberId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dailyTargets,
                        weeklyTargets,
                        monthlyTargets
                    })
                });
                const datas = await response.json();
                const {dailyTargets: getDailyTargets, weeklyTargets: getWeeklyTargets, monthlyTargets: getMonthlyTargets} = datas;
                
                // 데이터 추가
                setDailyTargets(getDailyTargets)
                setWeeklyTargets(getWeeklyTargets)
                setMonthlyTargets(getMonthlyTargets)
            } catch{
                console.error("Target 수신 중 에러");
            }
        };

        getRandomTargets();
        getTargets();
      }, [memberId]);

    return (
        <div>
            <Target 
                dailyRandomTargets={dailyRandomTargets}
                weeklyRandomTargets={weeklyRandomTargets}
                monthlyRandomTargets={monthlyRandomTargets}
                dailyTargets={dailyTargets}
                weeklyTargets={weeklyTargets}
                monthlyTargets={monthlyTargets}
            />
            <Achievement memberId={memberId}/>
        </div>
    );
};

export default AchievementContainer;