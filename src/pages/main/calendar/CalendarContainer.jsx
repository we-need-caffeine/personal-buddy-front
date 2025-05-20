import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import CalendarHeader from "./calendarHeader/CalendarHeader";
import { useSelector } from "react-redux";

const CalendarContainer = () => {

  // 해당 유저가 로그인 된 이후에 path를 강제로 변경하는 것을 방지
  const { currentUser } = useSelector((state) => state.member)
  const { memberId } = useParams();
  const navigate = useNavigate()
  
  if(currentUser.id){
    if(currentUser.id.toString() !== memberId) {
      alert('잘못된 접근입니다.')
      return navigate("/main")
    }
  }

  return (
    <div>
      <CalendarHeader />
      <Outlet />
      {/* 밑에 음식 컴포넌트, 카페 컴포넌트, 의류 */}
    </div>
  );
};

export default CalendarContainer;
