import React, { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useSelector } from "react-redux";

const CalendarInvite = () => {
  const { calendarId, hostId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { inviteInfo } = location.state || {};

  const { actions } = useContext(CalendarContext);
  const { getInvitesAll, setLastApprovedCalendarId, setLastApprovedMemberId } =
    actions;
  const memberId = useSelector((state) => state.member.currentUser.id);
  
  const handleApprove = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/${calendarId}/members/${memberId}/approve`,
        { method: "PUT" }
      );
      alert("초대를 수락했습니다.");

      setLastApprovedCalendarId(inviteInfo.calendarId);
      setLastApprovedMemberId(inviteInfo.invitedMemberId);

      await getInvitesAll();

      navigate("/main", { replace: true });
    } catch (error) {
      console.error("초대 수락 실패:", error);
    }
  };

  const handleReject = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/${calendarId}/${hostId}/reject`,
        {
          method: "PUT",
        }
      );
      alert("초대를 거절했습니다.");

      await getInvitesAll();

      navigate("/main", { replace: true });
    } catch (error) {
      console.error("초대 거절 실패:", error);
    }
  };

  // inviteInfo가 없는 경우 (잘못된 접근 or 새로고침 등)
  if (!inviteInfo)
    return <S.Message>초대 정보를 불러올 수 없습니다.</S.Message>;

  return (
    <S.Container>
      <S.Title>캘린더 초대</S.Title>
      <S.Description>
        {inviteInfo.memberName}님이 <strong>{inviteInfo.calendarTitle}</strong>{" "}
        캘린더에 초대했습니다.
      </S.Description>
      <S.ButtonContainer>
        <S.ApproveButton onClick={handleApprove}>수락하기</S.ApproveButton>
        <S.RejectButton onClick={handleReject}>거절하기</S.RejectButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default CalendarInvite;
