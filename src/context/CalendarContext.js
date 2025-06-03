import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// 초기값
const CalendarContext = createContext({
  state: [],
  actions: {},
});

// 제공하는 값
const CalendarProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [calendarIndex, setCalendarIndex] = useState(null);
  const memberId = useSelector((state) => state.member.currentUser.id);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [invites, setInvites] = useState([]);
  const [lastApprovedCalendarId, setLastApprovedCalendarId] = useState(null);
  const [lastApprovedMemberId, setLastApprovedMemberId] = useState(null);

  // ---- 서버에서 초대 목록 불러오기 ----
  const getInvitesAll = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/${memberId}`
      );

      const inviteList = await response.json();
      setInvites(inviteList);
      return inviteList;
    } catch (error) {
      console.error("초대 목록 조회 실패", error);
      return [];
    }
  };

  // ---- 서버에서 전체 캘린더 목록 불러오기 ----
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

    const { calendars } = await datas;
    setCalendars(calendars);

    if (calendars.length > 0) {
      const sorted = calendars.sort(
        (a, b) => a.calendarIndex - b.calendarIndex
      );

      setCalendarIndex(sorted[0].calendarIndex);
      setSelectedCalendarId(sorted[0].id);
    } else {
      setCalendarIndex(null);
      setSelectedCalendarId(null);
    }
  };

  // 로그인 멤버 변경 시 초대 목록 새로고침
  useEffect(() => {
    if (memberId) {
      getInvitesAll();
      getCalendarsAll();
    }
  }, [memberId]);

  // ---- 일정 색상 목록 불러오기 ----

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
    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/schedules/api/categories`,
          {
            method: "GET",
          }
        );
        const datas = await response.json();
        const newCategories = datas.map(
          (category) => category.scheduleCategoryTitle
        );
        setCategories(newCategories);
      } catch (error) {
        console.error("카테고리 조회 실패", error);
      }
    };
    getCategories();
  }, [memberId]);

  const getScheduleSubCategories = async (categoryId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/schedules/api/categories/${categoryId}`
      );
      const datas = await response.json();
      setSubCategories(datas);
    } catch (error) {
      console.error("소분류 조회 실패", error);
    }
  };
  const value = {
    state: {
      calendars,
      selectedCalendarId,
      colors,
      categories,
      invites,
      lastApprovedCalendarId,
      lastApprovedMemberId,
    },
    actions: {
      getCalendarsAll,
      getInvitesAll,
      setLastApprovedCalendarId,
      setLastApprovedMemberId,
      getScheduleSubCategories,
    },
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
