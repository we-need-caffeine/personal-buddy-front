import React from 'react';
import S from "./style";
import { Outlet } from 'react-router-dom';

const CalendarBody = () => {
    return (
        <S.Container>
            <Outlet/>
        </S.Container>
    );
};

export default CalendarBody;