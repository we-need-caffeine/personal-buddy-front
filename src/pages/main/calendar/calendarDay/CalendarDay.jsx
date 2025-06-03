import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const CalendarDay = ({
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

  // 겹치는 일정이 있는지 확인
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
      },
    ]);
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

  useEffect(() => {
    const isOnScheduleSave = location.pathname.includes("schedule-save");

    if (!selectedRange && !isOnScheduleSave) {
      // 선택 범위가 없고, 일정 저장 페이지도 아니면
      // 임시로 보여주던 신규 일정 이벤트 제거
      setEvents((prev) => prev.filter((e) => e.id !== "selected-range"));
      return;
    }

    if (selectedRange) {
      // 일정이 겹친다면 선택 취소 및 임시 이벤트 제거
      if (hasConflict(selectedRange)) {
        calendarRef.current?.getApi().unselect();
        onSelectRange(null);
        setEvents((prev) => prev.filter((e) => e.id !== "selected-range"));
        return;
      }

      // 충돌이 없다면, 신규 일정 임시 이벤트를 events에 추가
      updateTemporaryEvent(selectedRange);
    }
  }, [selectedRange, calendars, calendarId, location.pathname]);

  // 날짜 이동
  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  const handleToday = () => calendarRef.current.getApi().today();

  return (
    <S.CalendarWrapper
      style={{ "--highlight-color": selectedRange?.color ?? "#01CD74" }}
    >
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
          timeZone="local"
          height="100%"
          headerToolbar={false}
          nowIndicator={false}
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
              //onSelectRange(null);
              return;
            }

            onSelectRange(range);
            onCreateSchedule?.(info);
          }}
          eventClick={(info) => {
            //console.log(info.eventId);
            const eventId = info.event.id;
            if (
              !eventId ||
              eventId === "selected-range" ||
              eventId.startsWith("no-id")
            )
              return;
            navigate("schedule-view", { state: { eventId } });
          }}
          unselect={() => {
            if (!location.pathname.includes("schedule-save")) {
              onSelectRange(null);
            }
          }}
          datesSet={({ start }) => setCurrentDate(new Date(start))}
          eventContent={(arg) => {
            return {
              html: `<div class="fc-event-title">${arg.event.title}</div>`,
            };
          }}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarDay;
