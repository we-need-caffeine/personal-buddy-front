import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useSelector } from "react-redux";
import S from "./style";

const CalendarHeader = () => {
  const { currentUser } = useSelector((state) => state.member);
  const { state } = useContext(CalendarContext);
  const { calendars } = state;
  const { memberId, calendarId } = useParams();

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

        {/* + 버튼 탭 */}
        <NavLink to={`/main/${currentUser.id}/${calendarId}/calendar-save`}>
          <S.Tab>
            <img
              src="/assets/images/main/calendar/add.png"
              alt="캘린더 추가"
              style={{ width: "20px", height: "20px" }}
            />
          </S.Tab>
        </NavLink>
      </S.TabContainer>

      <S.DailyButtonWrapper>
        <NavLink to={"/"}>일간</NavLink>
      </S.DailyButtonWrapper>
    </div>
  );
};

export default CalendarHeader;
