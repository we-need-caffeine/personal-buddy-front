import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 초기값
const CalendarContext = createContext({
  state: [],
  actions: {},
});

// 제공하는 값
const CalendarProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [calendarIndex, setCalendarIndex] = useState(null);
  const memberId = useSelector((state) => state.member.currentUser.id);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  const navigate = useNavigate();

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

      const allTodos = [];

      datas.calendars.forEach((calendar) => {
        calendar.todoLists.forEach((todo) => {
          todo.calendarId = calendar.id;
        });
        allTodos.push(calendar.todoLists);
      });

      setCalendarIndex(datas.calendars[0].calendarIndex);
      //console.log(datas);
      // 객체 -> 배열로 데이터 값
      const { calendars } = await datas;
      setCalendars(calendars);
    };

    getCalendarsAll();
  }, [isUpdate, memberId]);

  useEffect(() => {
    const getColors = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/schedules/api/colors`,
        {
          method: "GET",
        }
      );
      const datas = await response.json();

     
      setColors(datas);
    };

    getColors();
  }, [memberId]);

  useEffect(() => {
    const categoryTitles = [];
    const getCategory = async () => {
      const response = await fetch(
         `${process.env.REACT_APP_BACKEND_URL}/schedules/api/categories`,
         {
          method: 'GET',
         }
        );
        const datas = await response.json();
        datas.forEach((category) => {
          categoryTitles.push(category.scheduleCategoryTitle);
        })
        setCategories(categoryTitles);
        //console.log(categoryTitles);
    };
    getCategory();
  }, [memberId])

  const value = {
    state: {
      calendars,
      selectedCalendarId,
      colors,
      categories,
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
