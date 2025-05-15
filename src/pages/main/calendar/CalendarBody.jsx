import React from 'react';
import CalendarLeft from './calendarLeft/CalendarLeft';
import CalendarRight from './calnerdarRight/CalendarRight';

const CalendarBody = () => {

    // const cal = 1;

    return (
        <>
            <CalendarLeft />
            {/* await fetch */}
            {/* 컴포넌트를 갈아끼운다 */}
            <CalendarRight />
            {/* {cal == 1 ? 
            <div></div>
            :
            <div></div>
            } */}
        </>
    );
};

export default CalendarBody;