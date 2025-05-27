import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import S from "./style";

const ScheduleView = () => {
  const location = useLocation();
  const { eventId } = location.state || {};

  const [schedule, setSchedule] = useState(null);

  // 스케줄 상세 조회
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/schedules/api/${eventId}`
        );
        const data = await response.json();
        console.log(data);
        setSchedule(data);
      } catch (error) {
        console.error("일정 조회 실패", error);
      }
    };

    if (eventId) {
      fetchSchedule();
    }
  }, [eventId]);

  if (!schedule) return <div>불러오는 중...</div>;

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.TitleInput value={schedule.scheduleTitle} readOnly />
      </S.TitleInputContainer>

      <S.MemberListContainer>
        {/* 멤버 목록 표시 필요시 여기에 */}
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
          <S.CancelButton>취소</S.CancelButton>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleView;
