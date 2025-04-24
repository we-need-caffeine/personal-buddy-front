import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';

const SurveyLayout = () => {
    
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname;
    const { state } = useContext(SurveyContext)
    const { confirmCategorys, details } = state
    const { detail, current } = details;

    const pathConfirm = !path.includes(confirmCategorys[confirmCategorys.length - 1])
    const backLocation = pathConfirm && confirmCategorys[confirmCategorys.length - 1] !== undefined;

    useEffect(() => {
        // 각 디테일이 없을 때에도 다시 검사하도록 보낸다.
        // 단, 검사하고 있던 모든 Context를 초기화 시켜야한다.
        if(backLocation){
            alert("잘못된 접근입니다. \n 다시 검사해주세요. 😅")
            navigate("/survey")
        }
    }, [path])

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default SurveyLayout;