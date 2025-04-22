import React from 'react';
import RecommendInformation from './recommend/RecommendInformation';
import RecommendPlace from './recommend/RecommendPlace';
import RecommendShopping from './recommend/RecommendShopping';
import CalendarBody from './calendar/CalendarBody';
import CalendarHeader from './calendar/calendarHeader/CalendarHeader';



const MainContainer = () => {
    return (
        <div>          
            <CalendarHeader />
            <CalendarBody />
            <RecommendInformation />
            <RecommendPlace />
            <RecommendShopping />
        </div>
    );
};

export default MainContainer;