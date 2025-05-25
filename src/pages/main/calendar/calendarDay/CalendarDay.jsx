import React, { useContext, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useParams } from "react-router-dom";
import { useCalendarSelection } from "../../../../hooks/calendar/useCalendarSelection";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const CalendarDay = () => {
  const { handleDateSelect } = useCalendarSelection();
  const { memberId, calendarId } = useParams();
  const { state } = useContext(CalendarContext);
  const { calendars } = state;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [color, setColor] = useState(null);
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
      backgroundColor: s.scheduleColor || "#01CD74",
      borderColor: s.scheduleColor || "#01CD74",
    }));

    setEvents(calendarEvents);
  }, [calendarId, calendars, selectedRange]);

  useEffect(() => {
    if (!selectedRange) return;

    setEvents((prevEvents) => [
      ...prevEvents.filter((e) => e.id !== "selected-range"),
      {
        id: "selected-range",
        title: "신규 일정",
        start: selectedRange.start,
        end: selectedRange.end,
        backgroundColor: "#01CD74",
        borderColor: "#01CD74",
        textColor: "#fff", // 선택사항
      },
    ]);
  }, [selectedRange]);

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
      <S.DateInfoWrapper>
        <S.LeftArrowIcon
          src="/assets/images/main/calendar/arrow.png"
          alt="이전"
          onClick={handlePrev}
        />

        <S.TodayText onClick={handleToday}>
          {format(currentDate, "yyyy년 M월 d일")}
        </S.TodayText>

        <S.ArrowIcon
          src="/assets/images/main/calendar/arrow.png"
          alt="다음"
          onClick={handleNext}
        />
      </S.DateInfoWrapper>

      <div style={{ height: "calc(780px - 50px)" }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          initialDate={new Date()}
          timeZone="local"
          height="100%"
          headerToolbar={false}
          nowIndicator={true}
          allDaySlot={false}
          selectable={true}
          selectMirror={true}
          eventDisplay="block"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          events={events}
          select={(info) => {
            setSelectedRange({
              start: info.startStr,
              end: info.endStr,
            });
            handleDateSelect(info, memberId, calendarId);
          }}
          datesSet={(arg) => {
            setCurrentDate(arg.start);
          }}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarDay;
