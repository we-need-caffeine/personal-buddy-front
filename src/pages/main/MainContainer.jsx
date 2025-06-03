/**
 * MainContainer
 * 1. 로그인한 유저 정보를 기반으로 캘린더 초대가 있는지, 최근 승인된 캘린더가 있는지, 
 *    아니면 기본 캘린더가 있는지 등 여러 조건에 따라 적절한 페이지로 자동 이동(redirect) 처리
 * 2. /main 진입 시, 조건에 따라 캘린더 상세 화면 등으로 자동 진입시키고,
 * 3. 자식 라우트(Outlet) 영역을 렌더링
 */

import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CalendarContext } from "../../context/CalendarContext";

const MainContainer = () => {
  // 현재 로그인한 유저 정보 가져오기
  const { currentUser } = useSelector((state) => state.member);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // 캘린더 관련 전역 상태 및 액션 함수 가져오기
  const { state, actions } = useContext(CalendarContext);
  const { invites, lastApprovedCalendarId, lastApprovedMemberId, selectedCalendarId } = state;
  const { getInvitesAll, getCalendarsAll } = actions;

  useEffect(() => {
    /**
     * [핵심 로직] 최초 렌더링 시
     * 1. 새로운 캘린더 초대가 있으면 초대 페이지로 이동
     * 2. 최근 승인된 캘린더가 있으면 해당 캘린더 상세 페이지로 이동
     * 3. 위 조건이 모두 아니면 캘린더 전체를 조회해서, 
     *    /main 진입 시 기본 캘린더 상세 페이지로 자동 이동 처리
     */
    const checkInvitesAndRedirect = async () => {
      try {
        // 1. 캘린더 초대 내역 조회
        await getInvitesAll();
        if (invites.length > 0) {
          // 초대가 있으면 초대 페이지로 리다이렉트
          const firstInvite = invites[0];
          navigate(
            `/calendar-invite/${firstInvite.calendarId}/${firstInvite.calendarInviteHostId}`,
            { state: { inviteInfo: firstInvite } }
          );
          return;
        }

        // 2. 최근 승인된 캘린더가 있으면 해당 상세 페이지로 이동
        if (lastApprovedCalendarId && lastApprovedMemberId) {
          navigate(`/main/${lastApprovedMemberId}/${lastApprovedCalendarId}`);
          return;
        }

        // 3. 위 조건이 아니면 전체 캘린더 데이터 새로 불러오기
        await getCalendarsAll();

        // 4. 기본 캘린더가 있을 때 /main에서 바로 상세 페이지로 이동
        if (currentUser.id && selectedCalendarId) {
          if (pathname === "/main") {
            navigate(`/main/${currentUser.id}/${selectedCalendarId}`);
          }
        }
      } catch (error) {
        console.error("초대 또는 캘린더 조회 실패:", error);
      }
    };

    // 로그인 상태일 때만 동작
    if (currentUser?.id) {
      checkInvitesAndRedirect();
    }
    // 상태 변화(유저, 경로, 캘린더 상태)마다 체크
  }, [
    currentUser,
    pathname,
    navigate,
    lastApprovedCalendarId,
    lastApprovedMemberId,
    selectedCalendarId,
  ]);

  // 자식 라우트 렌더링
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainContainer;
