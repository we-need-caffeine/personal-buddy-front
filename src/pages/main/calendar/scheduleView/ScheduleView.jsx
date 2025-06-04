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
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/schedules/api/delete/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("");
      }
      await getCalendarsAll();
      navigate(`/main/${memberId}/${calendarId}`);
    } catch (error) {
      console.error("일정 삭제 실패", error);
    }
  };
  // 스케줄 상세 조회
  useEffect(() => {
    const getSchedule = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/schedules/api/${eventId}`
        );
        const data = await response.json();
        
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
        {schedule.members && schedule.members.length > 0 ? (
          schedule.members.map((member) => (
            <S.MemberItem key={member.id}>
              <S.MemberImage
                src={`${process.env.REACT_APP_BACKEND_URL}/${member.memberImgPath}/${member.memberImgName}`}
                alt={member.memberName}
              />
              <S.MemberName>{member.memberName}</S.MemberName>
            </S.MemberItem>
          ))
        ) : (
          <S.MemberName>참여 멤버 없음</S.MemberName>
        )}
      </S.MemberListContainer>
      <S.DateContainer>
        <S.DateSectionGroup>
          <S.DateSection>
            <S.DateTextLabel>시작</S.DateTextLabel>
            <S.DateInputWrapper>
              <div>
                <S.DateText>
                  {schedule.scheduleStartDate?.split("T")[0]}
                </S.DateText>
                <S.DateText>
                  {schedule.scheduleStartDate?.split("T")[1]?.slice(0, 5)}
                </S.DateText>
              </div>
            </S.DateInputWrapper>
          </S.DateSection>

          <S.DateSection>
            <S.DateTextLabel>종료</S.DateTextLabel>
            <S.DateInputWrapper>
              <div>
                <S.DateText>
                  {schedule.scheduleEndDate?.split("T")[0]}
                </S.DateText>
                <S.DateText>
                  {schedule.scheduleEndDate?.split("T")[1]?.slice(0, 5)}
                </S.DateText>
              </div>
            </S.DateInputWrapper>
          </S.DateSection>

          <S.ContentInputWrapper>
            <S.DateTextLabel>장소</S.DateTextLabel>
            <S.DateText>
              {schedule.scheduleLocation || "없음"}
            </S.DateText>
          </S.ContentInputWrapper>

  

          <S.CategoryInputWrapper>
            <S.DateTextLabel>카테고리</S.DateTextLabel>
            <S.DateText>
              {schedule.scheduleCategoryTitle || "없음"}
            </S.DateText>
          </S.CategoryInputWrapper>
        </S.DateSectionGroup>
      </S.DateContainer>

      <S.ContentContainer>
        <S.ContentWrapper>
          {/* 상세 내용 영역 */}
           <S.ContentInputWrapper>
            <S.DateTextLabel>내용</S.DateTextLabel>
            <S.DateText>
              {schedule.scheduleContent || "없음"}
            </S.DateText>
          </S.ContentInputWrapper>

          <S.ButtonGroup>
            <S.DeleteButton
              onClick={(e) => {
                deleteSchedule();
              }}
            >
              삭제
            </S.DeleteButton>
            <S.CancelButton 
              onClick={(e) => {
                
              }}
            >취소</S.CancelButton>
          </S.ButtonGroup>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleView;
