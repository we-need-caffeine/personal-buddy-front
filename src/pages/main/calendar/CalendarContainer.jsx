import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useSelector } from "react-redux";

const CalendarContainer = () => {
  const { currentUser } = useSelector((state) => state.member);
  const { memberId, calendarId } = useParams();
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState(null);

  if (currentUser.id) {
    if (currentUser.id.toString() !== memberId) {
      alert("잘못된 접근입니다.");
      navigate("/main");
      return null;
    }
  }

  const handleCreateSchedule = (info) => {
    const range = {
      start: info.startStr,
      end: info.endStr,
      color: selectedRange?.color ?? "#01CD74",

    };
    setSelectedRange(range); 
    navigate("schedule-save"); 
  };

console.log(selectedRange);
  return (
    <div>
      <CalendarHeader />
      <Outlet
        context={{
          selectedRange,
          setSelectedRange,
          handleCreateSchedule,
        }}
      />
    </div>
  );
};

export default CalendarContainer;
