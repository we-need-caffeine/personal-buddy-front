import React, { useState } from "react";
import CalendarLeft from "./calendarLeft/CalendarLeft";
import CalendarRight from "./calnerdarRight/calendarTodo/CalendarTodo";

const CalendarBody = () => {
  const [mode, setMode] = useState("todo");
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
