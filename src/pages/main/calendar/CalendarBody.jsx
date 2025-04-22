import React from 'react';
import CalendarLeft from './calendarLeft/CalendarLeft';
import CalendarRight from './calnerdarRight/CalendarRight';

const CalendarBody = () => {
    return (
        <div>
            <CalendarLeft />
            <CalendarRight />
        </div>
    );
};

export default CalendarBody;