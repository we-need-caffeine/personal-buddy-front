import React, { useRef } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import CalendarDay from './CalendarDay';

const CalendarDayContainer = () => {
  const calendarRef = useRef(null);
  const { selectedRange, setSelectedRange, handleCreateSchedule } = useOutletContext();

  return (
    <div style={{ display: "flex" }}>
      <CalendarDay
        calendarRef={calendarRef}
        selectedRange={selectedRange}
        onSelectRange={setSelectedRange} // 상위에서 내려온 setSelectedRange 사용
        onCreateSchedule={handleCreateSchedule} // 상위에서 내려온 일정 생성 핸들러 사용
      />
      <Outlet context={{ selectedRange, setSelectedRange, handleCreateSchedule,calendarRef }} />
    </div>
  );
};

export default CalendarDayContainer;