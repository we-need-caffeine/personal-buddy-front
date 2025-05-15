import React from 'react';
import CalendarBody from './CalendarBody';
import { Outlet } from 'react-router-dom';

const calendarContainer = () => {
    return (
        <div>
            <CalendarBody/>
            <Outlet/>
        </div>
    );
};

export default calendarContainer;