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
  const { calendarId } = useParams();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 위치 및 날씨 상태값
  const [locationCoords, setLocationCoords] = useState(null);
  const [locationAddress, setLocationAddress] = useState(null);
  const [weather, setWeather] = useState(null);

  // 현재 위치 + 주소 받아오기
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationCoords({ latitude, longitude });

        // 주소 요청 (Nominatim)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          setLocationAddress(data.display_name);
        } catch (error) {
          console.error("주소 변환 실패:", error);
        }
      },
      (error) => console.warn("위치 오류:", error.message)
    );
  }, []);

  // 날씨 정보 요청 (OpenWeatherMap)
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const apiKey = "84901855b2c7261d9a761343f6d0c169";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
        );
        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
        //console.log("날씨 응답:", data);
      } catch (error) {
        console.error("날씨 정보 오류:", error);
      }
    };

    if (locationCoords) {
      fetchWeather(locationCoords.latitude, locationCoords.longitude);
    }
  }, [locationCoords]);

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

  const viewText = location.pathname.includes("/week")
    ? "주간"
    : location.pathname.includes("/month")
    ? "월간"
    : "일간";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* 캘린더 탭 */}
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
        {calendars.length < 8 && (
          <NavLink to={`/main/${currentUser.id}/${calendarId}/calendar-save`}>
            <S.Tab>
              <img
                src="/assets/images/main/calendar/add.png"
                alt="캘린더 추가"
                style={{ width: "20px", height: "20px" }}
              />
            </S.Tab>
          </NavLink>
        )}
      </S.TabContainer>

      {/* 뷰 변경 드롭다운 */}
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

      {/* 현재 위치 주소 + 날씨 출력 */}
      {(locationAddress || weather) && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            paddingTop: "6px",
            fontSize: "12px",
            color: "#333",
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            gap: "4px",
          }}
        >
          {locationAddress && <div>📍 {locationAddress}</div>}
          {weather && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="날씨 아이콘"
                style={{ width: "24px", height: "24px" }}
              />
              {weather.description} / {weather.temp.toFixed(1)}℃
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;
