/**
 * CalendarInvite
 * 1. 캘린더 초대 수락/거절 UI 및 동작 처리 컴포넌트
 * 2. URL 파라미터(calendarId, hostId) 및 location.state로 전달받은 초대 정보를 사용
 * 3. 초대 수락/거절 시 API 호출 및 상태 갱신, 완료 후 메인으로 리다이렉트
 * 4. 초대 정보 없을 때 예외 처리
 */

import React, { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import S from "./style";
import { useSelector } from "react-redux";

const CalendarInvite = () => {
  // URL 파라미터에서 캘린더/호스트 ID 추출
  const { calendarId, hostId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 받은 초대 정보(state로 전달됨)
  const { inviteInfo } = location.state || {};

  // CalendarContext에서 상태/액션 함수 추출
  const { actions } = useContext(CalendarContext);
  const { getInvitesAll, setLastApprovedCalendarId, setLastApprovedMemberId } =
    actions;

  // 현재 로그인 멤버 ID
  const memberId = useSelector((state) => state.member.currentUser.id);

  /**
   * [초대 수락]
   * - API로 수락 요청
   * - 상태 반영(최근 승인 캘린더/멤버 ID)
   * - 초대 목록 갱신 후 메인으로 이동
   */
  const handleApprove = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/${calendarId}/members/${memberId}/approve`,
        { method: "PUT" }
      );
      alert("초대를 수락했습니다.");

      // 최근 승인된 캘린더/멤버 ID 저장(메인 자동이동에 사용)
      setLastApprovedCalendarId(inviteInfo.calendarId);
      setLastApprovedMemberId(inviteInfo.invitedMemberId);

      await getInvitesAll();

      navigate("/main", { replace: true });
    } catch (error) {
      console.error("초대 수락 실패:", error);
    }
  };

  /**
   * [초대 거절]
   * - API로 거절 요청
   * - 초대 목록 갱신 후 메인으로 이동
   */
  const handleReject = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/members/${memberId}/calendars/${calendarId}/cancel`,
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

  // 초대 정보가 없을 때(잘못된 접근, 새로고침 등) 안내 메시지 노출
  if (!inviteInfo)
    return <S.Message>초대 정보를 불러올 수 없습니다.</S.Message>;

  // 초대 정보 렌더링 및 수락/거절 버튼 제공
  return (
    <S.Container>
      <S.BuddyLogo src="/assets/images/logo/buddy-logo.png" />
      <S.ContentContainer>
        <S.Title>캘린더 초대</S.Title>
        <S.Description>
          {inviteInfo.memberName}님이{" "}
          <strong>{inviteInfo.calendarTitle}</strong> 캘린더에 초대했습니다.
        </S.Description>
        <S.ButtonContainer>
          <S.ApproveButton onClick={handleApprove}>수락하기</S.ApproveButton>
          <S.RejectButton onClick={handleReject}>거절하기</S.RejectButton>
        </S.ButtonContainer>
      </S.ContentContainer>
    </S.Container>
  );
};

export default CalendarInvite;
