import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import S from "./style";

const CalendarWeek = ({
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
  const [weekRange, setWeekRange] = useState({ start: null, end: null });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const isOverlapping = (startA, endA, startB, endB) =>
    new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB);

  const hasConflict = (range) => {
    const calendar = calendars.find((c) => c.id === Number(calendarId));
    return calendar?.scheduleLists?.some((s) =>
      isOverlapping(
        range.start,
        range.end,
        s.scheduleStartDate,
        s.scheduleEndDate
      )
    );
  };

  const setEventsFromSchedules = () => {
    const calendar = calendars.find((c) => c.id === Number(calendarId));
    const schedules = calendar?.scheduleLists ?? [];

    return schedules.map((s) => ({
      id: String(s.id),
      title: `[${s.id}] ${s.scheduleTitle}`,
      start: s.scheduleStartDate,
      end: s.scheduleEndDate,
      backgroundColor: s.scheduleColor || "#01CD74",
      borderColor: s.scheduleColor || "#01CD74",
    }));
  };

  const updateTemporaryEvent = (range) => {
    setEvents((prev) => [
      ...prev.filter((e) => e.id !== "selected-range"),
      {
        id: "selected-range",
        title: "신규 일정",
        start: range.start,
        end: range.end,
        backgroundColor: range.color ?? "#01CD74",
        borderColor: range.color ?? "#01CD74",
        display: "background",
      },
    ]);
  };

  useEffect(() => {
    setEvents(setEventsFromSchedules());
  }, [calendarId, calendars]);

  useEffect(() => {
    onSelectRange(null);
  }, [calendarId]);

  useEffect(() => {
    const isOnScheduleSave = location.pathname.includes("schedule-save");

    if (!selectedRange && !isOnScheduleSave) {
      setEvents((prev) => prev.filter((e) => e.id !== "selected-range"));
      return;
    }

    if (selectedRange) {
      if (hasConflict(selectedRange)) {
        calendarRef.current?.getApi().unselect();
        onSelectRange(null);
        setEvents((prev) => prev.filter((e) => e.id !== "selected-range"));
        return;
      }

      updateTemporaryEvent(selectedRange);
    }
  }, [selectedRange, calendars, calendarId, location.pathname]);

  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  const handleToday = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.today();

    // 오늘 날짜로 수동 업데이트
    const today = new Date();
    setCurrentDate(today);
  };

  return (
    <S.CalendarWrapper isNested={isNested}>
      <S.DateInfoWrapper>
        <S.LeftArrowIcon
          src="/assets/images/main/calendar/arrow.png"
          alt="이전"
          onClick={handlePrev}
        />
        <S.TodayText onClick={handleToday}>
          {weekRange.start && weekRange.end
            ? `${format(weekRange.start, "yyyy년 M월 d일")} ~ ${format(
                new Date(weekRange.end.getTime() - 1), // end는 다음 주 첫날이므로 -1ms
                "yyyy년 M월 d일"
              )}`
            : ""}
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
          initialView="timeGridWeek"
          timeZone="local"
          height="100%"
          headerToolbar={false}
          nowIndicator
          allDaySlot={false}
          selectable
          selectMirror
          unselectAuto
          eventDisplay="block"
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

            if (hasConflict(range)) {
              calendarRef.current?.getApi().unselect();
              onSelectRange(null);
              return;
            }

            onSelectRange(range);
            onCreateSchedule?.(info);
          }}
          eventClick={(info) => {
            const eventId = info.event.id;
            if (
              !eventId ||
              eventId === "selected-range" ||
              eventId.startsWith("no-id")
            )
              return;
            navigate(`/main/${memberId}/${calendarId}/week/schedule-save`, {
              state: { eventId },
            });
          }}
          unselect={() => {
            if (!location.pathname.includes("schedule-save")) {
              onSelectRange(null);
            }
          }}
          datesSet={({ start, end }) => {
            console.log("📆 datesSet called with:", start, end);
            setCurrentDate(new Date(start));
            setWeekRange({ start: new Date(start), end: new Date(end) }); // 주 범위 저장
          }}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarWeek;
