import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarProvider,
  CalendarContext,
} from "../../context/CalendarContext";

const MainContainer = () => {
  const { currentUser } = useSelector((state) => state.member);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const { state, actions } = useContext(CalendarContext);
  const {
    lastApprovedCalendarId,
    lastApprovedMemberId,
    selectedCalendarId,
  } = state;

  const { getInvitesAll, getCalendarsAll } = actions;

  useEffect(() => {
    const checkInvitesAndRedirect = async () => {
      try {
        const newInvites = await getInvitesAll();

        // console.log(
        //   "MainContainer invites 상태 변화:", JSON.stringify(newInvites)
        // );

        if (newInvites.length > 0) {
          const firstInvite = newInvites[0];
          // console.log("이동할 초대:", firstInvite);

          navigate(
            `/calendar-invite/${firstInvite.calendarId}/${firstInvite.calendarInviteHostId}`,
            { state: { inviteInfo: firstInvite } }
          );
          return;
        }

        if (lastApprovedCalendarId && lastApprovedMemberId) {
          navigate(`/main/${lastApprovedMemberId}/${lastApprovedCalendarId}`);
          return;
        }

        await getCalendarsAll();

        if (currentUser.id && selectedCalendarId) {
          if (pathname === "/main") {
            navigate(`/main/${currentUser.id}/${selectedCalendarId}`);
          }
        }
      } catch (error) {
        console.error("초대 또는 캘린더 조회 실패:", error);
      }
    };

    if (currentUser?.id) {
      checkInvitesAndRedirect();
    }
  }, [
    currentUser,
    pathname,
    navigate,
    lastApprovedCalendarId,
    lastApprovedMemberId,
    selectedCalendarId,
  ]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainContainer;
