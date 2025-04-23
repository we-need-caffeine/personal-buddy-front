import React from 'react';

import CalendarBody from './calendar/CalendarBody';
import CalendarHeader from './calendar/calendarHeader/CalendarHeader';
import RecommendInformation from './recommend/information/RecommendInformation';
import RecommendPlace from './recommend/place/RecommendPlace';
import RecommendShopping from './recommend/shopping/RecommendShopping';



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