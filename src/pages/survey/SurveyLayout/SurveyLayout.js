import React from 'react';
import { Outlet } from 'react-router-dom';

const SurveyLayout = () => {
    return (
        <div>
            설문조사 공통 요소
            (캐릭터+말풍선) 
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default SurveyLayout;