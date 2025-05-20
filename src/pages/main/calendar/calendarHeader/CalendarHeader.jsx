import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useSelector } from "react-redux";

const CalendarHeader = () => {
  const { currentUser } = useSelector((state) => state.member)
  const { state } = useContext(CalendarContext)

  const calendarList = state.map(({id, calendarTitle}) => (
    <NavLink key={id} to={`/main/${currentUser.id}/${id}`}>{calendarTitle}</NavLink>
  ))

  return (
    <div style={{display : "flex", justifyContent : "space-between"}}>
      <div>
        {calendarList}
      </div>
      <div>
        <Link to={"/"}>개인</Link>
        <Link to={"/"}>일간</Link>
      </div>
    </div>
  )
};

export default CalendarHeader;
