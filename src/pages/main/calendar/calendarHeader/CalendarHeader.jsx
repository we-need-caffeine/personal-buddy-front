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
  const extractCityDistrict = (displayName) => {
    const parts = displayName.split(",").map((part) => part.trim());

    if (parts.length >= 7) {
      const city = parts[6]; // 시
      const district = parts[5]; // 구
      const dong = parts[3]; // 동

      return `${city} ${district} ${dong}`; // "서울 강남구 자곡동"
    } else {
      return displayName; // fallback
    }
  };

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
          const formattedAddress = extractCityDistrict(data.display_name);
          setLocationAddress(formattedAddress);
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
    <S.Container>
      {/* 현재 위치 주소 + 날씨 출력 */}
      {(locationAddress || weather) && (
        <S.LocationContainer>
          {locationAddress && <div>{locationAddress}</div>}
          {weather && (
            <S.WeatherInfo>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="날씨 아이콘"
              />
              {weather.description} / {weather.temp.toFixed(1)}℃
            </S.WeatherInfo>
          )}
        </S.LocationContainer>
      )}
      {/* 뷰 변경 드롭다운 */}
      <S.DailyButtonContainer>
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
      </S.DailyButtonContainer>

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
    </S.Container>
  );
};

export default CalendarHeader;
