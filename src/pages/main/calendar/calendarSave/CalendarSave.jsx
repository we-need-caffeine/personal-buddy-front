import React, { useState, useRef, useEffect } from "react";
import S from "./style";

const CalendarSave = () => {
  const [calendarName, setCalendarName] = useState("WeNeedCaffeine");
  const [allMembers] = useState(["김동건", "서민아", "박세현", "이덕준", "홍길동", "이순신"]);
  const [invitedMembers, setInvitedMembers] = useState(["장재영", "양진영", "함지현", "김영수", "강감찬", "홍길동"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleInvite = (name) => {
    if (!invitedMembers.includes(name)) {
      setInvitedMembers((prev) => [...prev, name]);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
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
      <S.Title>캘린더 설정</S.Title>

      <S.Row>
        <S.Label>캘린더 이름</S.Label>
        <S.Input value={calendarName} onChange={(e) => setCalendarName(e.target.value)} />
      </S.Row>

      <S.Row>
        <S.Label>초대</S.Label>
        <S.InviteSection ref={dropdownRef}>
          <S.SearchBox
            placeholder="검색"
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && (
            <S.Dropdown>
              {allMembers.map((member) => (
                <S.DropdownItem key={member} onClick={() => toggleInvite(member)}>
                  <S.ProfileIcon />
                  <S.DropdownName>{member}</S.DropdownName>
                  <S.InviteButton>초대</S.InviteButton>
                </S.DropdownItem>
              ))}
            </S.Dropdown>
          )}
        </S.InviteSection>
      </S.Row>

      <S.MemberList>
        <S.MemberListTitle>멤버 리스트({invitedMembers.length}/8)</S.MemberListTitle>
        {invitedMembers.map((m) => (
          <S.MemberItem key={m}>
            <S.ProfileIcon />
            <S.MemberName>{m}</S.MemberName>
            {m === "강감찬" && <S.HostBadge></S.HostBadge>}
          </S.MemberItem>
        ))}
      </S.MemberList>

      <S.DeleteButton>삭제</S.DeleteButton>
    </S.Container>
  );
};

export default CalendarSave;