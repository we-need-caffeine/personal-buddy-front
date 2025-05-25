import { useNavigate } from "react-router-dom";

export const useCalendarSelection = () => {
  const navigate = useNavigate();

  const handleDateSelect = ({ startStr, endStr }, memberId, calendarId) => {
    navigate(`/main/${memberId}/${calendarId}/schedule-save`, {
      state: {
        start: startStr,
        end: endStr,
      },
    });
  };

  return { handleDateSelect };
};
