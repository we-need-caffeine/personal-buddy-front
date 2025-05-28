import React, { useRef } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import CalendarWeek from "./CalendarWeek";

const CalendarWeekContainer = () => {
  const location = useLocation();
  const calendarRef = useRef(null);

  const { selectedRange, setSelectedRange, handleCreateSchedule } =
    useOutletContext();

  const isNested = location.pathname.includes("/schedule-save"); // 중첩 여부 판별
  return (
    <div style={{ display: "flex" }}>
      <CalendarWeek
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

export default CalendarWeekContainer;
