import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalendarForm from "./CalendarForm";
import { CalendarContext } from "../../../../context/CalendarContext";

const CalendarUpdate = () => {
  const { memberId, calendarId } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useContext(CalendarContext);
  const { calendars, selectedCalendarId } = state;
  const { getCalendarsAll } = actions;

  const [calendar, setCalendar] = useState(null);
  const [availableMembers, setAvailableMembers] = useState([]); // 초대 가능
  const [currentMembers, setCurrentMembers] = useState([]); // 이미 참여 중
  const [invitedMembers, setInvitedMembers] = useState(
    calendar?.invitedMembers || []
  );
  const getCalendar = async () => {
    try {
      // 캘린더 상세
      const calendarResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/${calendarId}`
      );
      const calendarData = await calendarResponse.json();
      setCalendar(calendarData);

      // 초대 가능 멤버
      const memberResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/${memberId}/followings/${calendarId}`
      );
      const members = await memberResponse.json();
      setAvailableMembers(members);
    } catch (error) {
      console.error("캘린더/멤버 정보 조회 실패", error);
    }
  };

  useEffect(() => {
    getCalendar();
  }, [calendarId, memberId]);

  //  캘린더 멤버 조회
  const getCalendarMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/${calendarId}`
      );
      const data = await response.json();
      setCurrentMembers(data);
      //console.log(data);
    } catch (error) {
      console.error("캘린더 멤버 조회 실패", error);
    }
  };

  useEffect(() => {
    getCalendarMembers();
  }, [calendarId]);

  //  수정 핸들러
  const updateCalendar = async ({ calendarName, invitedMembers }) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/calendars/api/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: calendarId,
          calendarTitle: calendarName,
          memberId: Number(memberId),
          calendarIndex: 0,
          calendarIsGroup: 0,
        }),
      });
      const invites = invitedMembers.map((member) => ({
        calendarInviteInvitedMemberId: member.memberId,
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

  // 멤버 추방 핸들러
  const removeMember = async (memberIdToRemove) => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/remove/members/${memberIdToRemove}/calendars/${calendarId}`,
        {
          method: "DELETE",
        }
      );

      // 다시 멤버 리스트 갱신
      await getCalendarMembers();
      await getCalendar();

      alert("멤버가 추방되었습니다.");
    } catch (error) {
      console.error("멤버 추방 실패:", error);
      alert("멤버 추방 중 오류가 발생했습니다.");
    }
  };

  const deleteCalendar = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/delete/${calendarId}`,
        {
          method: "DELETE",
        }
      );

      // 응답이 성공이 아니면 에러 던지기
      if (!response.ok) {
        throw new Error("서버 오류 발생");
      }

      await getCalendarsAll();

      if (selectedCalendarId) {
        navigate(`/main/${memberId}/${selectedCalendarId}`);
      } else {
        navigate(`/main/${memberId}`);
      }
      alert("삭제 완료");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!calendar) {
    return <div>Loading...</div>;
  }
  return (
    <CalendarForm
      initialName={calendar.calendarTitle}
      calendarId={calendarId}
      initialInvited={invitedMembers}
      setInvitedMembers={setInvitedMembers}
      allMembers={availableMembers}
      showInviteSection={true}
      currentMembers={currentMembers}
      removeMember={removeMember}
      refreshAvailableMembers={getCalendar}
      isUpdateMode={true}
      memberId={memberId}
      buttons={[
        {
          label: "저장",
          onClick: updateCalendar,
          type: "primary",
        },
        {
          label: "삭제",
          onClick: deleteCalendar,
          type: "danger",
          disabled: calendars.length <= 1, // 1개 이하일 때 비활성화
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
