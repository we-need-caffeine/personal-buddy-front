import React, { useState, useRef, useEffect, useContext } from "react";
import S from "./style";
import { useOutletContext } from "react-router-dom";
import { useScheduleForm } from "../../../../hooks/calendar/useScheduleForm";
import { useLocation, useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useNavigate } from "react-router-dom";

const ScheduleListView = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 이전 페이지에서 넘어온 state 확인
  const { memberId, calendarId } = useParams(); // URL 파라미터

  // 캘린더 컨텍스트
  const { selectedRange, setSelectedRange, calendarRef } = useOutletContext(); // Outlet에서 받은 선택 범위
  const { state, actions } = useContext(CalendarContext); // 전역 캘린더 상태 및 액션
  const { calendars, colors, categories } = state;
  const { getCalendarsAll } = actions; // 전체 캘린더 다시 불러오기
  const { scedules, setScedules } = useState();

  // 일정 정보 상태
  const [title, setTitle] = useState(""); // 일정 제목

  const schedules = location.state?.schedule || [];
  const clickedDate = location.state?.date;

  

  const formatToKoreanTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours < 12 ? "오전" : "오후";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${period} ${hour12}:${paddedMinutes}`;
  };

  return (
    <S.Container>
      <S.DateInputContainer>
        <S.DateInput value={clickedDate} />
      </S.DateInputContainer>

      <S.ContentContainer>
        {schedules?.map((schedule) => {
          console.log(schedule);
          return (
            <S.ScheduleWrapper>
              <S.TitleWrapper>
                <S.Circle color={schedule.scheduleColor}></S.Circle>

                <S.TitleInputContainer>
                  {schedule.scheduleTitle}
                </S.TitleInputContainer>
              </S.TitleWrapper>
              <S.Time>
                {formatToKoreanTime(schedule.scheduleStartDate)} ~{" "}
                {formatToKoreanTime(schedule.scheduleEndDate)}
              </S.Time>
            </S.ScheduleWrapper>
          );
        })}
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleListView;
