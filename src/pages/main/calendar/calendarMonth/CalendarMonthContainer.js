import React, { useRef } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import CalendarMonth from './CalendarMonth';

const CalendarMonthContainer = () => {
  const location = useLocation();
  const calendarRef = useRef(null);

  const { selectedRange, setSelectedRange, handleCreateSchedule } =
    useOutletContext();

  const isNested = location.pathname.includes("/schedule-list-view"); // 중첩 여부 판별
  return (
    <div style={{ display: "flex" }}>
      <CalendarMonth
        isNested = {isNested}
        calendarRef={calendarRef}
        selectedRange={selectedRange}
        onSelectRange={setSelectedRange}
        onCreateSchedule={handleCreateSchedule}
      />
      {isNested && (
        <Outlet
          context={{
            selectedRange,
            setSelectedRange,
            handleCreateSchedule,
            calendarRef,
          }}
        />
      )}
    </div>
  );
};

export default CalendarMonthContainer;