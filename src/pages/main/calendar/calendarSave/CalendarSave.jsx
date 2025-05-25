import React, { useState, useRef, useEffect, useContext } from "react";
import S from "./style";
import { CalendarContext } from "../../../../context/CalendarContext";
import { useParams } from "react-router-dom";

const CalendarSave = () => {
  const { memberId, calendarId } = useParams();
  const [calendarName, setCalendarName] = useState("퍼스널 버디");
  const { state } = useContext(CalendarContext);
  const [allMembers, setAllMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleInvite = (member) => {
    if (!invitedMembers.some((m) => m.id === member.id)) {
      setInvitedMembers((prev) => [...prev, member]);
    }
  };

  const getMutualFollowings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/${memberId}/followings`,
        { method: "GET" }
      );
      const datas = await response.json();
      setAllMembers(datas);

    } catch (error) {
      console.error("캘린더 초대 멤버 조회 실패", error);
    }
  };

  useEffect(() => {
    getMutualFollowings();
  }, [calendarId]);

  const registerCalendar = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calendarTitle: calendarName,
            calendarIndex: 3,
            memberId: Number(memberId),
          }),
        }
      );
      const data = await res.json();
      return data.calendarId;
    } catch (error) {
      console.error("캘린더 등록 실패", error);
      return null;
    }
  };

  const inviteMembers = async (calendarId) => {
    try {
      const invites = invitedMembers.map((member) => ({
        calendarInviteInvitedMemberId: member.id,
        calendarInviteHostId: Number(memberId),
        calendarInviteIsApproved: 0,
        calendarId: calendarId,
      }));

      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invites),
        }
      );
    } catch (error) {
      console.error("초대 멤버 등록 실패", error);
    }
  };

  const handleSave = async () => {
    const calendarId = await registerCalendar();
    if (calendarId) {
      await inviteMembers(calendarId);
      alert("캘린더가 저장되었습니다.");
      // navigate('/calendars'); 등 이동 처리 가능
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>캘린더 설정</S.Title>
      </S.TitleContainer>

      <S.RowContainer $noBorder>
        <S.Row>
          <S.Label>캘린더 이름</S.Label>
          <S.Input
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
          />
        </S.Row>
      </S.RowContainer>

      <S.RowContainer>
        <S.Row>
          <S.Label>초대</S.Label>
          <S.InviteSection ref={dropdownRef}>
            <S.SearchBox
              placeholder="검색"
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <S.Dropdown>
                {allMembers.map((member) => {
                  const isInvited = invitedMembers.some(
                    (m) => m.id === member.id
                  );
                  // console.log(member.id, isInvited);
                  // console.log("allMembers:", allMembers);
                  return (
                    <S.DropdownItem key={member.id}>
                      <S.Left>
                        <S.ProfileIcon />
                        <S.DropdownName>{member.memberName}</S.DropdownName>
                      </S.Left>
                      <S.InviteButton
                        onClick={() => toggleInvite(member)}
                        disabled={isInvited}
                      >
                        {isInvited ? "초대됨" : "초대"}
                      </S.InviteButton>
                    </S.DropdownItem>
                  );
                })}
              </S.Dropdown>
            )}
          </S.InviteSection>
        </S.Row>
      </S.RowContainer>

      <S.ContentContainer>
        <S.MemberList>
          <S.MemberListTitle>
            멤버 리스트 ({invitedMembers.length}/8)
          </S.MemberListTitle>
          {invitedMembers.map((m) => (
            <S.MemberItem key={m.id}>
              <S.ProfileIcon />
              <S.MemberName>{m.memberName}</S.MemberName>
            </S.MemberItem>
          ))}
        </S.MemberList>
      </S.ContentContainer>

      <S.ButtonGroup>
        <S.SaveButton onClick={handleSave}>저장</S.SaveButton>
        <S.CancelButton>취소</S.CancelButton>
      </S.ButtonGroup>
    </S.Container>
  );
};

export default CalendarSave;
