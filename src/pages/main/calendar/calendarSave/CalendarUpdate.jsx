import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarForm from "./CalendarForm";
import { CalendarContext } from "../../../../context/CalendarContext";

const CalendarUpdate = () => {
  const { memberId, calendarId } = useParams();
  const navigate = useNavigate();
  const { actions } = useContext(CalendarContext);
  const { getCalendarsAll } = actions;

  const [calendar, setCalendar] = useState(null);
  const [allMembers, setAllMembers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // 캘린더 상세
        const calendarRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/calendars/api/${calendarId}`
        );
        const calendarData = await calendarRes.json();
        setCalendar(calendarData);

        // 초대 가능 멤버
        const memberRes = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/${memberId}/followings`
        );
        const members = await memberRes.json();
        setAllMembers(members);
      } catch (error) {
        console.error("캘린더/멤버 정보 조회 실패", error);
      }
    };

    fetchData();
  }, [calendarId, memberId]);

  //  수정 핸들러
  const handleUpdate = async ({ calendarName, invitedMembers }) => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/${calendarId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calendarTitle: calendarName,
            memberId: Number(memberId),
          }),
        }
      );
      const invites = invitedMembers.map((member) => ({
        calendarInviteInvitedMemberId: member.id,
        calendarInviteHostId: Number(memberId),
        calendarInviteIsApproved: 0,
        calendarId: Number(calendarId),
      }));

      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invites),
        }
      );

      await getCalendarsAll();
      alert("수정 완료");
      navigate(`/main/${memberId}/${calendarId}`);
    } catch (error) {
      console.error("캘린더 수정 실패", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm("정말 이 캘린더를 삭제하시겠습니까?")) return;
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/${calendarId}`,
        {
          method: "DELETE",
        }
      );
      await getCalendarsAll();
      alert("삭제 완료");
      navigate(`/main/${memberId}`);
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!calendar) return <div>로딩 중...</div>;

  return (
    <CalendarForm
      initialName={calendar.calendarTitle}
      initialInvited={calendar.invitedMembers || []}
      allMembers={allMembers}
      showInviteSection={true}
      buttons={[
        {
          label: "저장",
          onClick: handleUpdate,
          type: "primary",
        },
        {
          label: "삭제",
          onClick: handleDelete,
          type: "danger",
        },
        {
          label: "취소",
          onClick: () => navigate(`/main/${memberId}/${calendarId}`),
        },
      ]}
    />
  );
};

export default CalendarUpdate;