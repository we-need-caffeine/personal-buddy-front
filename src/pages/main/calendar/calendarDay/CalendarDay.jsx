import React, { useContext, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useParams } from "react-router-dom";
import { useCalendarSelection } from "../../../../hooks/calendar/useCalendarSelection";

const CalendarDay = () => {
  const { handleDateSelect } = useCalendarSelection();
  const { memberId, calendarId } = useParams();
  const { state } = useContext(CalendarContext);
  const { calendars } = state;

  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    const schedules = [];

    calendars.forEach((calendar) => {
      if (calendar.id === Number(calendarId)) {
        if (Array.isArray(calendar.scheduleLists)) {
          calendar.scheduleLists.forEach((schedule) => {
            schedules.push(schedule);
          });
        }
      }
    });

    const calendarEvents = schedules.map((s) => ({
      id: String(s.id),
      title: s.scheduleTitle,
      start: s.scheduleStartDate,
      end: s.scheduleEndDate,
      color: s.scheduleColor,
    }));

    setEvents(calendarEvents);
  }, [calendarId, calendars]);

  const handlePrev = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  };

  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();
  };

  return (
    <S.CalendarWrapper>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handlePrev}>이전 날짜</button>
        <button onClick={handleToday}>오늘</button>
        <button onClick={handleNext}>다음 날짜</button>
      </div>
      <div style={{ height: "calc(780px - 50px)" }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          initialDate={new Date()}
          timeZone="local"
          height="100%" // 여기 중요!
          headerToolbar={false}
          nowIndicator={true}
          allDaySlot={false}
          selectable={true}
          selectMirror={true}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          events={events}
          select={(info) => handleDateSelect(info, memberId, calendarId)}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarDay;
