import React from "react";
import CalendarBody from "./calendarBody/CalendarBody";
import { Outlet } from "react-router-dom";

const CalendarContainer = () => {
  return (
    <div>
      <CalendarBody />
    </div>
  );
};

export default CalendarContainer;
