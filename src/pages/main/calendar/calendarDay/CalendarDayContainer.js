import React, { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import CalendarDay from './CalendarDay';
import { useSelector } from 'react-redux';
import { CalendarContext } from '../../../../context/CalendarContext';

const CalendarDayContainer = () => {
  const { currentUser } = useSelector((state) => state.member)
  const { state, action } = useContext(CalendarContext)
  const { memberId, calendarId } = useParams();

  const calendar = state.filter(({id}) => id === Number(calendarId))[0];

  return (
    <div style={{display:"flex"}}>
      <CalendarDay />
      <Outlet />
    </div>
  );
};

export default CalendarDayContainer;