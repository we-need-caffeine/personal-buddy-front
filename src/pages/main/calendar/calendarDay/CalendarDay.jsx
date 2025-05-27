import React, { useContext, useEffect, useRef, useState } from "react";
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

  // 일정 목록을 FullCalendar 이벤트 객체로 세팅
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
      title: `[${s.id}] ${s.scheduleTitle}`,
      start: s.scheduleStartDate,
      end: s.scheduleEndDate,
      backgroundColor: s.scheduleColor || "#01CD74",
      borderColor: s.scheduleColor || "#01CD74",
    }));

    setEvents(calendarEvents);
  }, [calendarId, calendars]);

  // 겹침 여부 검사
  const isOverlapping = (startA, endA, startB, endB) => {
    return (
      new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB)
    );
  };

  useEffect(() => {
    onSelectRange(null);
  }, [calendarId]);

  // selectedRange 감시 및 임시 이벤트 반영
  useEffect(() => {
    const isOnScheduleSave = location.pathname.includes("schedule-save");

    //console.log(" selectedRange useEffect triggered");
    //console.log(" location.pathname:", location.pathname);
    console.log(" selectedRange:", selectedRange);

    if (!selectedRange && !isOnScheduleSave) {
      console.log(" selectedRange 없어서 신규 이벤트 제거됨");
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== "selected-range")
      );
      return;
    }

    if (selectedRange) {
      const calendar = calendars.find((c) => c.id === Number(calendarId));
      const isConflict = calendar?.scheduleLists?.some((s) =>
        isOverlapping(
          selectedRange.start,
          selectedRange.end,
          s.scheduleStartDate,
          s.scheduleEndDate
        )
      );

      if (isConflict && !isOnScheduleSave) {
        //console.warn("일정 겹침 → selectedRange null로 초기화됨");
        calendarRef.current?.getApi().unselect();
        onSelectRange(null);
        return;
      }

      //console.log("selectedRange 유효, 임시 이벤트 생성");

      setEvents((prevEvents) => [
        ...prevEvents.filter((e) => e.id !== "selected-range"),
        {
          id: "selected-range",
          title: "신규 일정",
          start: selectedRange.start,
          end: selectedRange.end,
          backgroundColor: selectedRange?.color ?? "#01CD74",
          borderColor: selectedRange?.color ?? "#01CD74",
        },
      ]);
    }
  }, [selectedRange, calendars, calendarId, location.pathname]);

  // 날짜 이동 제어 함수
  const handlePrev = () => {
    calendarRef.current.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current.getApi().next();
  };

  const handleToday = () => {
    calendarRef.current.getApi().today();
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
          unselectAuto={true}
          eventDisplay="block"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          events={events}
          select={(info) => {
            console.log(selectedRange);
            const range = {
              start: info.startStr,
              end: info.endStr,
              color: selectedRange?.color ?? "#01CD74",
            };

            const calendar = calendars.find((c) => c.id === Number(calendarId));
            const isConflict = calendar?.scheduleLists?.some((s) =>
              isOverlapping(
                range.start,
                range.end,
                s.scheduleStartDate,
                s.scheduleEndDate
              )
            );

            if (isConflict) {
              //console.warn(" select 중 충돌 감지 → 선택 취소");
              calendarRef.current?.getApi().unselect();
              onSelectRange?.(null);
              return;
            }

            //console.log("select 완료 → selectedRange 업데이트됨");
            onSelectRange?.(range);
            console.log(range);
            console.log(info);
            onCreateSchedule?.(info);
          }}
          eventClick={(info) => {
            const eventId = info.event.id;

            // "selected-range" 임시 이벤트 클릭 방지
            if (
              !eventId ||
              eventId === "selected-range" ||
              eventId.startsWith("no-id")
            ) {
              console.log("무시된 이벤트 클릭:", info.event);
              return;
            }

            navigate("schedule-view", { state: { eventId } });
          }}
          unselect={() => {
            if (!location.pathname.includes("schedule-save")) {
              //console.log("캘린더 빈 곳 클릭 → selectedRange null");
              onSelectRange(null);
            } else {
              //console.log("schedule-save 상태에서는 selectedRange 유지");
            }
          }}
          datesSet={(arg) => {
            setCurrentDate(new Date(arg.start));
          }}
        />
      </div>
    </S.CalendarWrapper>
  );
};

export default CalendarDay;
