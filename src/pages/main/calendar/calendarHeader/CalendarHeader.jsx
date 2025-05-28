import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useSelector } from "react-redux";
import S from "./style";

const CalendarHeader = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.member);
  const { state } = useContext(CalendarContext);
  const { calendars } = state;
  const { memberId, calendarId } = useParams();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewChange = (view) => {
    navigate(`/main/${currentUser.id}/${calendarId}/${view}`);
    setShowDropdown(false);
  };

  // 현재 뷰 문자열 추출
  const path = location.pathname.split("/").pop();
  const viewText =
    path === "week" ? "주간" : path === "month" ? "월간" : "일간";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
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
                      e.preventDefault();
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

      <S.DailyButtonWrapper ref={dropdownRef}>
        <S.DailyViewButton onClick={() => setShowDropdown((prev) => !prev)}>
          {viewText}
        </S.DailyViewButton>
        {showDropdown && (
          <S.DropdownMenu>
            <S.DropdownItem onClick={() => handleViewChange("")}>
              일간
            </S.DropdownItem>
            <S.DropdownItem onClick={() => handleViewChange("week")}>
              주간
            </S.DropdownItem>
            <S.DropdownItem onClick={() => handleViewChange("month")}>
              월간
            </S.DropdownItem>
          </S.DropdownMenu>
        )}
      </S.DailyButtonWrapper>
    </div>
  );
};

export default CalendarHeader;
