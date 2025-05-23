import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Banner from "../layout/banner/Banner";
import { useSelector } from "react-redux";
import { CalendarProvider } from "../../context/CalendarContext";

const MainContainer = () => {
  const { currentUser } = useSelector((state) => state.member);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const getCalendarFisrtIndex = async () => {
      const response = await fetch(
        `http://localhost:10000/calendars/api/members/${currentUser.id}/calendars`
      );
      const datas = await response.json();
      return datas;
    };

    getCalendarFisrtIndex()
      .then((calenders) => calenders.map(({ calendarIndex }) => calendarIndex))
      .then((calenderIds) => calenderIds.sort()[0])
      .then((calenderId) => {
        // 캘린더 아이디, 로그인한 멤버 아이디가 있으면 이동
        if (currentUser.id && calenderId) {
          if (pathname === "/main") {
            navigate(`/main/${currentUser.id}/${calenderId}`);
          }
        }
      })
      .catch(console.error);
  }, [currentUser, pathname, navigate]);

  return (
    <div>
      <CalendarProvider>
        <Outlet />
      </CalendarProvider>
    </div>
  );
};

export default MainContainer;
