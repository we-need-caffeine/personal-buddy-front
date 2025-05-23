import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useSelector } from "react-redux";
import S from "./style";

const CalendarHeader = () => {
  const { currentUser } = useSelector((state) => state.member);
  const { state } = useContext(CalendarContext);
  const { calendars } = state;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <S.TabContainer>
        {calendars.map(({ id, calendarTitle }) => (
          <NavLink
            key={id}
            to={`/main/${currentUser.id}/${id}`}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <S.Tab className={isActive ? "selected" : ""}>
                {calendarTitle}
              </S.Tab>
            )}
          </NavLink>
        ))}
      </S.TabContainer>
      <div>
        <NavLink to={"/"}>개인</NavLink>
        <NavLink to={"/"}>일간</NavLink>
      </div>
    </div>
  );
};

export default CalendarHeader;