import React, { useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useSelector } from "react-redux";

const CalendarContainer = () => {
  const { currentUser } = useSelector((state) => state.member);
  const { memberId, calendarId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState(null);

  // 잘못된 접근 차단
  if (currentUser.id) {
    if (currentUser.id.toString() !== memberId) {
      alert("잘못된 접근입니다.");
      navigate("/main");
      return null;
    }
  }

  // 뷰 판단 (week/month/day)
  const view = location.pathname.includes("/week")
    ? "week"
    : location.pathname.includes("/month")
    ? "month"
    : "";

  const handleCreateSchedule = (info) => {
    const range = {
      start: info.startStr,
      end: info.endStr,
      color: selectedRange?.color ?? "#01CD74",
    };
    setSelectedRange(range);

    const basePath = `/main/${memberId}/${calendarId}`;
    const targetPath = view
      ? `${basePath}/${view}/schedule-save`
      : `${basePath}/schedule-save`;

    navigate(targetPath);
  };

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
