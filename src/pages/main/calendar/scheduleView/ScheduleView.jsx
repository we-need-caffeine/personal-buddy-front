import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import S from "./style";
import { CalendarContext } from "../../../../context/CalendarContext";

const ScheduleView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memberId, calendarId } = useParams();
  const { actions } = useContext(CalendarContext);
    const { getCalendarsAll } = actions;
  const { eventId } = location.state || {};

  const [schedule, setSchedule] = useState(null);

  const deleteSchedule = async () => {
    
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/schedules/api/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if(!response.ok) {
        throw new Error("")
      }
      await getCalendarsAll();
      navigate(`/main/${memberId}/${calendarId}`);
    } catch (error) {
      console.error("일정 삭제 실패", error);
    }
  }
  // 스케줄 상세 조회
  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/schedules/api/${eventId}`
        );
        const data = await response.json();
        //console.log(eventId);
        //console.log(data);
        setSchedule(data);
      } catch (error) {
        console.error("일정 조회 실패", error);
      }
    };

    if (eventId) {
      getSchedule();
    }
  }, [eventId]);

  if (!schedule) return <div>불러오는 중...</div>;

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.TitleInput value={schedule.scheduleTitle} />
      </S.TitleInputContainer>

      <S.MemberListContainer>

      </S.MemberListContainer>

      <S.DateContainer>
        <S.DateSectionGroup>
          <S.DateSection>
            <S.DateTextLabel>시작</S.DateTextLabel>
            <S.DateInputWrapper>
              <S.DateTextLabel>
                {schedule.scheduleStartDate?.split("T")[0]}
              </S.DateTextLabel>
              <S.DateTextLabel>
                {schedule.scheduleStartDate?.split("T")[1]?.slice(0, 5)}
              </S.DateTextLabel>
            </S.DateInputWrapper>
          </S.DateSection>

          <S.DateSection>
            <S.DateTextLabel>종료</S.DateTextLabel>
            <S.DateInputWrapper>
              <S.DateTextLabel>
                {schedule.scheduleEndDate?.split("T")[0]}
              </S.DateTextLabel>
              <S.DateTextLabel>
                {schedule.scheduleEndDate?.split("T")[1]?.slice(0, 5)}
              </S.DateTextLabel>
            </S.DateInputWrapper>
          </S.DateSection>

          <S.ContentInputWrapper>
            <S.DateTextLabel>장소</S.DateTextLabel>
            <S.DateTextLabel>
              {schedule.scheduleLocation || "없음"}
            </S.DateTextLabel>
          </S.ContentInputWrapper>

          <S.ContentInputWrapper>
            <S.DateTextLabel>내용</S.DateTextLabel>
            <S.DateTextLabel>
              {schedule.scheduleContent || "없음"}
            </S.DateTextLabel>
          </S.ContentInputWrapper>

          <S.CategoryInputWrapper>
            <S.DateTextLabel>카테고리</S.DateTextLabel>
            <S.DateTextLabel>
              {schedule.scheduleCategoryTitle || "없음"}
            </S.DateTextLabel>
          </S.CategoryInputWrapper>
        </S.DateSectionGroup>
      </S.DateContainer>

      <S.ContentContainer>
        <S.ContentWrapper>
          {/* 상세 내용 영역 */}
          내용
          <S.ButtonGroup>
            <S.DeleteButton onClick={(e) => {
              deleteSchedule();
            }}>삭제</S.DeleteButton>
            <S.CancelButton>취소</S.CancelButton>
          </S.ButtonGroup>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleView;
