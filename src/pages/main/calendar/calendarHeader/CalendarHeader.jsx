import React, { useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useSelector } from "react-redux";
import S from "./style";

const CalendarHeader = () => {
  const navigate = useNavigate();
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
                {Number(calendarId) === id && (
                  <img
                    src="/assets/images/main/calendar/ModifyDark.png"
                    alt="수정"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginLeft: "6px",
                      verticalAlign: "middle",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault(); // 탭 이동 방지
                      navigate(
                        `/main/${currentUser.id}/${calendarId}/calendar-update`
                      );
                    }}
                  />
                )}
              </S.Tab>
            )}
          </NavLink>
        ))}

        {/* + 버튼 */}
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
