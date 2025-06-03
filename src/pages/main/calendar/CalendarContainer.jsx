/**
 * CalendarContainer
 * 1. 캘린더 헤더와 추천 정보/장소/쇼핑 컴포넌트, 그리고 자식 Outlet(캘린더 본문 영역)을 렌더링하는 페이지
 * 2. URL 파라미터(memberId, calendarId)와 로그인 유저 정보가 일치하는지 검사(불일치시 메인으로 리다이렉트)
 * 3. 일정 생성시 range, color 상태를 관리하고, 뷰 타입에 따라 적절한 경로로 이동
 * 4. 자식 컴포넌트에 Outlet context로 선택 범위/일정생성핸들러를 내려줌
 */

import React, { useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useSelector } from "react-redux";
import RecommendInformation from "../recommend/information/RecommendInformation";
import RecommendPlace from "../recommend/place/RecommendPlace";
import RecommendShopping from "../recommend/shopping/RecommendShopping";

const CalendarContainer = () => {
  // Redux에서 로그인된 유저 정보 가져오기
  const { currentUser } = useSelector((state) => state.member);

  // URL 파라미터에서 멤버/캘린더 ID 추출
  const { memberId, calendarId } = useParams();

  // 현재 라우트 정보 및 페이지 이동용 navigate
  const location = useLocation();
  const navigate = useNavigate();

  // 일정 선택 범위 상태
  const [selectedRange, setSelectedRange] = useState(null);

  // [접근제어] 로그인 유저의 ID와 URL의 memberId가 다르면 메인으로 리다이렉트
  if (currentUser.id) {
    if (currentUser.id.toString() !== memberId) {
      alert("잘못된 접근입니다.");
      navigate("/main");
      return null;
    }
  }

  // 현재 뷰 타입(week, month) 구분
  const view = location.pathname.includes("/week")
    ? "week"
    : location.pathname.includes("/month")
    ? "month"
    : "";

  /**
   * [일정 생성 핸들러]
   * - 날짜 범위 및 색상 정보를 selectedRange에 저장
   * - 뷰에 따라 해당하는 일정등록/일정목록 페이지로 이동
   */
  const handleCreateSchedule = (info) => {
    const range = {
      start: info.startStr,
      end: info.endStr,
      color: selectedRange?.color ?? "#01CD74", // 선택된 색상 없으면 기본값
    };
    setSelectedRange(range);

    // basePath 및 이동할 경로 구성
    const basePath = `/main/${memberId}/${calendarId}`;
    const targetPath =
      view === "month"
        ? `${basePath}/${view}/schedule-list-view`
        : `${basePath}/${view ? `${view}/schedule-save` : "schedule-save"}`;

    console.log("[DEBUG] navigate to:", targetPath);
    navigate(targetPath);
  };

  return (
    <div>
      {/* 상단 캘린더 헤더 */}
      <CalendarHeader />

      {/* 캘린더 본문 영역 - Outlet으로 하위 라우트 렌더링 + context 전달 */}
      <Outlet
        context={{
          selectedRange,
          setSelectedRange,
          handleCreateSchedule,
        }}
      />

      {/* 추천 정보/장소/쇼핑 컴포넌트 (사이드 or 하단) */}
      <RecommendInformation />
      <RecommendPlace />
      <RecommendShopping />
    </div>
  );
};

export default CalendarContainer;
