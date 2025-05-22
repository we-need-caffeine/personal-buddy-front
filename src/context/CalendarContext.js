import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// 초기값
const CalendarContext = createContext({
  state: [],
  actions: {},
});

// 제공하는 값
const CalendarProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [calendarIndex, setCalendarIndex] = useState(null);
  const memberId = useSelector((state) => state.member.currentUser.id);

  useEffect(() => {
    const getCalendarsAll = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/calendars`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memberId),
        }
      );
      const datas = await response.json();
      //console.log(datas);
      const allTodos = [];
      datas.calendars.forEach((calendar) => {
        calendar.todoLists.forEach((todo) => {
          todo.calendarId = calendar.id;
        })
        allTodos.push(calendar.todoLists);
      });
      setTodos(allTodos);

      setCalendarIndex(datas.calendars[0].calendarIndex);
      // 객체 -> 배열로 데이터 값
      const { calendars } = await datas;
      setCalendars(calendars);
    };

    getCalendarsAll();
  }, [isUpdate, memberId]);

  useEffect(() => {
   // console.log("todos 상태 변경됨:", todos);
  }, [todos]);

  useEffect(() => {
    // console.log("CalendarContext 상태값:", calendars);
    // console.log(process.env.REACT_APP_BACKEND_URL);
  }, [calendars]);

  const value = {
    state: {
      calendars,
      todos,
    },
    actions: {
      //  할일, 캘린더, 캘린더 공유, 일정, 일정 공유
    },
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
