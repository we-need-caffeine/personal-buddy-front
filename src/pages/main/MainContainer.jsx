import React from 'react';

import CalendarHeader from './calendar/calendarHeader/CalendarHeader';
import RecommendInformation from './recommend/information/RecommendInformation';
import RecommendPlace from './recommend/place/RecommendPlace';
import RecommendShopping from './recommend/shopping/RecommendShopping';
import CalendarContainer from './calendar/CalendarContainer';



const MainContainer = () => {
    return (
        <div>          
            메인 컨테이너
            <CalendarHeader />
            <CalendarContainer />
            <RecommendInformation />
            <RecommendPlace />
            <RecommendShopping />
        </div>
    );
};

export default MainContainer;