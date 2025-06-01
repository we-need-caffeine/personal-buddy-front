import React, { useState, useRef, useEffect, useContext } from "react";
import S from "./style";
import { useOutletContext } from "react-router-dom";
import { useScheduleForm } from "../../../../hooks/calendar/useScheduleForm";
import { useLocation, useParams } from "react-router-dom";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useNavigate } from "react-router-dom";

const ScheduleSave = () => {
  const navigate = useNavigate(); // 페이지 이동
  const location = useLocation(); // 이전 페이지에서 넘어온 state 확인
  const { memberId, calendarId } = useParams(); // URL 파라미터
  const { start, end } = location.state || {}; // 선택된 일정 시간

  // 캘린더 컨텍스트
  const { selectedRange, setSelectedRange, calendarRef } = useOutletContext(); // Outlet에서 받은 선택 범위
  const { state, actions } = useContext(CalendarContext); // 전역 캘린더 상태 및 액션
  const { calendars, colors, categories } = state;
  const { getCalendarsAll } = actions; // 전체 캘린더 다시 불러오기

  //#region 상태변수
  // 일정 정보 상태
  const [title, setTitle] = useState(""); // 일정 제목
  const [content, setContent] = useState(""); // 일정 내용
  const [color, setColor] = useState("#01CD74"); // 일정 색상
  const [mainCategory, setMainCategory] = useState(""); // 상위 카테고리
  const [subCategory, setSubCategory] = useState(""); // 하위 카테고리
  const [repeat, setRepeat] = useState(""); // 반복 주기

  // 시간 및 날짜 (useScheduleForm 커스텀 훅)
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    setStartAndEndFromDate,
  } = useScheduleForm(); // 날짜/시간 관리

  // 유효성 검사 상태
  const [invalidTimeRange, setInvalidTimeRange] = useState(false); // 시작 > 종료 시간 여부
  const [hasConflict, setHasConflict] = useState(false); // 일정 겹침 여부

  // 멤버 관련 상태
  const [calendarMembers, setCalendarMembers] = useState([]); // 캘린더 공유 멤버 목록
  const [selectedMembers, setSelectedMembers] = useState(() => {
    const id = Number(memberId);
    return Number.isNaN(id) ? [] : [{ id, name: "나" }];
  }); // 선택된 멤버들

  // 드롭다운 열림 상태
  const [mainOpen, setMainOpen] = useState(false); // 상위 카테고리 드롭다운
  const [subOpen, setSubOpen] = useState(false); // 하위 카테고리 드롭다운
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false); // 색상 드롭다운
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false); // 멤버 드롭다운
  const [repeatDropdownOpen, setRepeatDropdownOpen] = useState(false); // 반복 드롭다운
  const [openStartTime, setOpenStartTime] = useState(false); // 시작 시간 드롭다운
  const [openEndTime, setOpenEndTime] = useState(false); // 종료 시간 드롭다운
  //#endregion

  // 외부 클릭 감지를 위한 ref
  const colorRef = useRef(null); // 색상 드롭다운
  const memberRef = useRef(null); // 멤버 드롭다운
  const mainRef = useRef(null); // 상위 카테고리 드롭다운
  const subRef = useRef(null); // 하위 카테고리 드롭다운
  const repeatRef = useRef(null); // 반복 드롭다운
  const timeRef = useRef(null); // 시작 시간 드롭다운
  const endTimeRef = useRef(null); // 종료 시간 드롭다운

  const mainCategories = categories;
  const subCategories = {
    운동: ["헬스", "수영", "등산"],
    공부: ["게임", "음악", "여행"],
    업무: ["회의", "보고", "개발"],
    모임: ["가족모임", "친구모임", "직장모임"],
    여가: ["영화감상", "드라마보기", "산책", "취미활동"],
    식사: ["아침식사", "점심식사", "저녁식사", "간식", "외식"],
    여행: ["국내여행", "해외여행", "당일치기", "캠핑"],
    건강: ["병원방문", "건강검진", "약복용"],
  };
  const repeatOptions = ["없음", "매일", "매주", "선택한 날짜의 요일"];

  // 캘린더에서 선택된 날짜 범위를 컴포넌트 내부의 날짜/시간 입력 필드 상태에 반영
  useEffect(() => {
    if (selectedRange?.start && selectedRange?.end) {
      setStartAndEndFromDate(selectedRange.start, selectedRange.end);
    }
  }, [selectedRange]);

  const toggleMember = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.id === member.id);
      return isSelected
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, member];
    });
  };

  // A일정이 B일정에 겹치는지 판단
  const isOverlapping = (startA, endA, startB, endB) => {
    return (
      new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB)
    );
  };

  // 중복 + 시간 순서 검사
  useEffect(() => {
    if (!startDate || !endDate || !startTime || !endTime) return;

    const newStart = new Date(`${startDate}T${startTime}:00`);
    const newEnd = new Date(`${endDate}T${endTime}:00`);

    // 시간 순서 검사
    setInvalidTimeRange(newEnd <= newStart);

    // 일정 겹침 검사
    const currentCalendar = calendars.find((c) => c.id === Number(calendarId));
    const hasOverlap = currentCalendar?.scheduleLists?.some((schedule) => {
      const existingStart = new Date(schedule.scheduleStartDate);
      const existingEnd = new Date(schedule.scheduleEndDate);
      return isOverlapping(newStart, newEnd, existingStart, existingEnd);
    });

    setHasConflict(hasOverlap);
  }, [startDate, endDate, startTime, endTime, calendars, calendarId]);

  // Context에서 받은 calendar로 캘린더 가져오기
  useEffect(() => {
    const members = [];
    calendars.forEach((calendar) => {
      if (calendar.id === Number(calendarId)) {
        calendar.sharedMemberLists.forEach((member) => {
          members.push({
            id: member.id,
            name: member.memberName,
            imgPath: member.memberImgPath,
            imgName: member.memberImgName,
          });
        });
      }
    });

    setCalendarMembers(members);
  }, [calendarId, calendars]);

  //#region 일정 등록
  const saveSchedule = async () => {
    const payload = {
      calendarId: Number(calendarId),
      scheduleColor: color,
      scheduleCreatedDate: new Date().toISOString().slice(0, 19) + "+09:00",
      scheduleStartDate: `${startDate}T${startTime}:00+09:00`,
      scheduleEndDate: `${endDate}T${endTime}:00+09:00`,
      scheduleTitle: title,
      scheduleContent: content,
      scheduleCategory: mainCategory || null,
      scheduleRepeat: repeat === "없음" ? 0 : 1,
      memberIds: selectedMembers.map((member) => member.id),
    };

    //console.log("[DEBUG] payload", payload)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/schedules/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("일정 등록 실패");
      }
      navigate(`/main/${memberId}/${calendarId}`);
      //console.log("payload:", payload);
      getCalendarsAll();
    } catch (error) {
      console.error("일정 등록 에러", error);
    }
  };
  //#endregion

  // DB에서 받은 색 코드 이름으로 매핑
  const getColorName = (code) => {
    const map = {
      "#01CD74": "초록",
      "#4AB3F7": "스카이블루",
      "#F35F8C": "핑크",
      "#B38BDC": "보라",
      "#3FC2C8": "민트",
    };
    return map[code] ?? code;
  };

  //#region 시간 드롭다운
  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  //#endregion

  // 캘린더에서 선택한 시간(start, end)을 일정 등록 페이지에 반영하기 위한 useEffect.
  // 문자열 또는 Date 객체 형태의 값을 ISO 문자열로 통일한 후,
  // - 날짜/시간 입력 필드 상태(setStartAndEndFromDate)에 반영하고,
  // - 전체 선택 범위 상태(selectedRange)에도 저장한다.
  // start, end로 날짜 상태 세팅

  useEffect(() => {
    if (start && end) {
      const isoStart =
        typeof start === "string" ? start : new Date(start).toISOString();
      const isoEnd =
        typeof end === "string" ? end : new Date(end).toISOString();

      setStartAndEndFromDate(isoStart, isoEnd);

      setSelectedRange((prev) => ({
        ...prev,
        start: isoStart,
        end: isoEnd,
        color: prev?.color ?? "#01CD74",
      }));
    }
  }, [start, end]);

  // 색상만 반영
  useEffect(() => {
    if (color && selectedRange?.start && selectedRange?.end) {
      setSelectedRange((prev) => ({
        ...prev,
        color,
      }));
    }
  }, [color]);

  useEffect(() => {
    if (hasConflict && !invalidTimeRange) {
      setSelectedRange(null);
    }
  }, [hasConflict, invalidTimeRange]);

  //#region 외부 클릭 감지 추가 (드롭바 체크 해제)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorRef.current && !colorRef.current.contains(e.target)) {
        setColorDropdownOpen(false);
        //setColor("#01CD74");
      }
      if (memberRef.current && !memberRef.current.contains(e.target)) {
        setMemberDropdownOpen(false);
      }
      if (mainRef.current && !mainRef.current.contains(e.target)) {
        setMainOpen(false);
      }
      if (subRef.current && !subRef.current.contains(e.target)) {
        setSubOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target)) {
        setOpenStartTime(false);
      }
      if (endTimeRef.current && !endTimeRef.current.contains(e.target)) {
        setOpenEndTime(false);
      }
      if (repeatRef.current && !repeatRef.current.contains(e.target)) {
        setRepeatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(calendarMembers);
  //#endregion
  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.TitleInput
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </S.TitleInputContainer>

      <S.DateContainer>
        <S.DateSectionGroup>
          <S.DateSection>
            <S.DateTextLabel>시작</S.DateTextLabel>
            <S.DateInputWrapper>
              <S.DateInput
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <S.TimeDropdownContainer ref={timeRef}>
                <S.TimeBox onClick={() => setOpenStartTime((prev) => !prev)}>
                  {startTime}
                </S.TimeBox>
                {openStartTime && (
                  <S.TimeList>
                    {timeOptions.map((time) => (
                      <S.TimeItem
                        key={time}
                        onClick={() => {
                          setStartTime(time);
                          setOpenStartTime(false);
                          if (!startDate || !endDate || !endTime) return;
                          const startISO = `${startDate}T${time}:00`;
                          const endISO = `${endDate}T${endTime}:00`;
                          setSelectedRange((prev) => ({
                            ...prev,
                            start: startISO,
                            end: endISO,
                          }));
                        }}
                      >
                        {time}
                      </S.TimeItem>
                    ))}
                  </S.TimeList>
                )}
              </S.TimeDropdownContainer>
            </S.DateInputWrapper>
          </S.DateSection>

          <S.DateSection>
            <S.DateTextLabel>종료</S.DateTextLabel>
            <S.DateInputWrapper>
              <S.DateInput
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <S.TimeDropdownContainer ref={endTimeRef}>
                <S.TimeBox onClick={() => setOpenEndTime((prev) => !prev)}>
                  {endTime}
                </S.TimeBox>
                {openEndTime && (
                  <S.TimeList>
                    {timeOptions.map((time) => {
                      const selectedEnd = new Date(`${endDate}T${time}:00`);
                      const selectedStart = new Date(
                        `${startDate}T${startTime}:00`
                      );
                      const isInvalidEnd = selectedEnd <= selectedStart;
                      return (
                        <S.TimeItem
                          key={time}
                          onClick={() => {
                            if (isInvalidEnd) return;
                            setEndTime(time);
                            setOpenEndTime(false);
                            if (!startDate || !startTime || !endDate) return;
                            const startISO = `${startDate}T${startTime}:00`;
                            const endISO = `${endDate}T${time}:00`;
                            setSelectedRange((prev) => ({
                              ...prev,
                              start: startISO,
                              end: endISO,
                            }));
                          }}
                          style={{
                            color: isInvalidEnd ? "#ccc" : "black",
                            cursor: isInvalidEnd ? "not-allowed" : "pointer",
                          }}
                        >
                          {time}
                        </S.TimeItem>
                      );
                    })}
                  </S.TimeList>
                )}
              </S.TimeDropdownContainer>

              {hasConflict && !invalidTimeRange && (
                <S.Message>이미 해당 시간에 일정이 존재합니다.</S.Message>
              )}
              {invalidTimeRange && (
                <S.Message>시작 시간이 종료 시간보다 늦습니다.</S.Message>
              )}
            </S.DateInputWrapper>
          </S.DateSection>
        </S.DateSectionGroup>
      </S.DateContainer>

      <S.ContentContainer>
        <S.ContentWrapper>
          <S.ContentFormGroup>
            <S.ContentRow>
              색
              <S.MemberDropdownContainer ref={colorRef}>
                <S.MemberSelectBox
                  onClick={() => setColorDropdownOpen((prev) => !prev)}
                >
                  <S.ColorCircle color={color} />
                  {color ? getColorName(color) : "색상 선택"}
                </S.MemberSelectBox>
                {colorDropdownOpen && (
                  <S.MemberDropdownList>
                    {colors.map((c) => (
                      <S.MemberItem
                        key={c}
                        onClick={() => {
                          setColor(c);
                          setSelectedRange((prev) => ({
                            ...prev,
                            color: c,
                          }));
                        }}
                      >
                        <S.MemberWrapper>
                          <S.ColorCircle color={c} />
                          <S.MemberName>{getColorName(c)}</S.MemberName>
                        </S.MemberWrapper>
                      </S.MemberItem>
                    ))}
                  </S.MemberDropdownList>
                )}
              </S.MemberDropdownContainer>
            </S.ContentRow>

            <S.ContentRow>
              멤버
              <S.MemberDropdownContainer ref={memberRef}>
                <S.MemberSelectBox
                  onClick={() => setMemberDropdownOpen(!memberDropdownOpen)}
                >
                  {selectedMembers.length > 0
                    ? ` ${selectedMembers.map((m) => m.name).join(", ")}`
                    : `캘린더 멤버 (${calendarMembers.length})`}
                </S.MemberSelectBox>
                {memberDropdownOpen && (
                  <S.MemberDropdownList>
                    {calendarMembers.map((member) => (
                      <S.MemberItem key={member.id} onClick={() => toggleMember(member)}>
                        <S.MemberWrapper>
                          <S.MemberImage
                                          src={`${process.env.REACT_APP_BACKEND_URL}/${member.imgPath}/${member.imgName}`}
                                          alt={member.memberName}
                                        />
                          <S.MemberName>{member.name}</S.MemberName>
                        </S.MemberWrapper>
                        <S.CheckIcon
                          checked={selectedMembers.some(
                            (s) => s.name === member.name
                          )}
                        />
                      </S.MemberItem>
                    ))}
                  </S.MemberDropdownList>
                )}
              </S.MemberDropdownContainer>
            </S.ContentRow>

            <S.ContentRow>
              카테고리
              <S.ContentCategoryWrapper>
                <S.CustomDropdownContainer ref={mainRef}>
                  <S.CustomDropdownSelectBox
                    onClick={() => setMainOpen((prev) => !prev)}
                  >
                    {mainCategory || "상위 선택"}
                  </S.CustomDropdownSelectBox>
                  {mainOpen && (
                    <S.CustomDropdownList>
                      {mainCategories.map((item) => (
                        <S.CustomDropdownItem
                          key={item}
                          onClick={() => {
                            setMainCategory(item);
                            setSubCategory("");
                            setMainOpen(false);
                          }}
                        >
                          {item}
                        </S.CustomDropdownItem>
                      ))}
                    </S.CustomDropdownList>
                  )}
                </S.CustomDropdownContainer>

                <S.CustomDropdownContainer ref={subRef}>
                  <S.CustomDropdownSelectBox
                    onClick={() => {
                      if (mainCategory) setSubOpen((prev) => !prev);
                    }}
                    disabled={!mainCategory}
                  >
                    {subCategory || "하위 선택"}
                  </S.CustomDropdownSelectBox>
                  {subOpen && (
                    <S.CustomDropdownList>
                      {subCategories[mainCategory]?.map((item) => (
                        <S.CustomDropdownItem
                          key={`${mainCategory}-${item}`}
                          onClick={() => {
                            setSubCategory(item);
                            setSubOpen(false);
                          }}
                        >
                          {item}
                        </S.CustomDropdownItem>
                      ))}
                    </S.CustomDropdownList>
                  )}
                </S.CustomDropdownContainer>
              </S.ContentCategoryWrapper>
            </S.ContentRow>

            <S.ContentRow>
              장소
              <S.ContentRowInput />
            </S.ContentRow>

            <S.ContentRow>
              반복
              <S.MemberDropdownContainer ref={repeatRef}>
                <S.MemberSelectBox
                  onClick={() => setRepeatDropdownOpen((prev) => !prev)}
                >
                  {repeat || "반복 선택"}
                </S.MemberSelectBox>
                {repeatDropdownOpen && (
                  <S.MemberDropdownList>
                    {repeatOptions.map((option) => (
                      <S.MemberItem
                        key={option}
                        onClick={() => {
                          setRepeat(option);
                          setRepeatDropdownOpen(false);
                        }}
                      >
                        <S.MemberName>{option}</S.MemberName>
                      </S.MemberItem>
                    ))}
                  </S.MemberDropdownList>
                )}
              </S.MemberDropdownContainer>
            </S.ContentRow>

            <S.ContentRowTextArea>
              내용
              <S.ContentRowTextInput
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </S.ContentRowTextArea>
          </S.ContentFormGroup>

          <S.ButtonGroup>
            <S.SaveButton
              onClick={saveSchedule}
              disabled={hasConflict || invalidTimeRange}
            >
              저장
            </S.SaveButton>
            <S.CancelButton
              onClick={() => navigate(`/main/${memberId}/${calendarId}`)}
            >
              취소
            </S.CancelButton>
          </S.ButtonGroup>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleSave;
