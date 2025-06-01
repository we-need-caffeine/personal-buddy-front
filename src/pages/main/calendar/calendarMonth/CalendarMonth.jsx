import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const CalendarMonth = ({
  isNested,
  calendarRef,
  selectedRange,
  onSelectRange,
  onCreateSchedule,
}) => {
  const { memberId, calendarId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useContext(CalendarContext);
  const { calendars } = state;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  

  const setEventsFromSchedules = () => {
    const calendar = calendars.find((c) => c.id === Number(calendarId));
    const schedules =
      calendar && calendar.scheduleLists ? calendar.scheduleLists : [];

    return schedules.map((s) => ({
      id: String(s.id),
      title: `[${s.id}] ${s.scheduleTitle}`,
      start: s.scheduleStartDate,
      end: s.scheduleEndDate,
      backgroundColor: s.scheduleColor || "#01CD74",
      borderColor: s.scheduleColor || "#01CD74",
    }));
  };

 

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;

    // 현재 캘린더에서 일정 목록 추출
    const calendar = calendars.find((c) => c.id === Number(calendarId));
    const schedules = calendar?.scheduleLists || [];
    const color = calendar?.scheduleLists?.scheduleColorZZ
    //console.log(schedules);
    const isSameDay = (day1, day2) =>
      day1.getFullYear() === day2.getFullYear() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getDate() === day2.getDate();

    const filtered = schedules.filter((s) => {
      const start = new Date(s.scheduleStartDate);
      const target = new Date(clickedDate);
      return isSameDay(start, target);
    });
    //console.log(filtered);
    navigate("schedule-list-view", {
      state: {
        schedule: filtered,
        date: clickedDate,
        //time: 
      },
    });
  };

  useEffect(() => {
    // 현재 calendarId에 해당하는 scheduleLists를 읽어서
    // FullCalendar가 인식할 수 있는 events 형태로 변환 후 적용
    setEvents(setEventsFromSchedules());
  }, [calendarId, calendars]);

  useEffect(() => {
    // 다른 캘린더로 이동했을 때 선택된 일정 범위를 초기화함
    onSelectRange(null);
  }, [calendarId]);

  

  // 날짜 이동
  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  const handleToday = () => calendarRef.current.getApi().today();

  return (
    <S.CalendarWrapper isNested={isNested}>
      <S.DateInfoWrapper>
        <S.LeftArrowIcon
          src="/assets/images/main/calendar/arrow.png"
          alt="이전"
          onClick={handlePrev}
        />
        <S.ArrowIcon
          src="/assets/images/main/calendar/arrow.png"
          alt="다음"
          onClick={handleNext}
        />
      </S.DateInfoWrapper>

      <div style={{ height: "calc(780px - 50px)" }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          timeZone="local"
          height="100%"
          headerToolbar={false}
          nowIndicator
          allDaySlot={false}
          selectable
          selectMirror
          unselectAuto
          eventDisplay="block"
          dateClick={handleDateClick}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          events={events}
          select={(info) => {
            const range = {
              start: info.startStr,
              end: info.endStr,
              color: selectedRange?.color ?? "#01CD74",
            };

           

            onSelectRange(range);
            onCreateSchedule?.(info);
          }}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarMonth;
