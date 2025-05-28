import React, { useState, useEffect, useRef } from "react";
import S from "./style"; // calendarSave/style.js 사용

const CalendarForm = ({
  initialName = "",
  initialInvited = [],
  allMembers = [],
  showInviteSection = true,
  buttons = [],
}) => {
  const [calendarName, setCalendarName] = useState(initialName);
  const [invitedMembers, setInvitedMembers] = useState(initialInvited);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지 → 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 초대 멤버 추가
  const toggleInvite = (member) => {
    if (!invitedMembers.some((m) => m.id === member.id)) {
      setInvitedMembers((prev) => [...prev, member]);
    }
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>캘린더 설정</S.Title>
      </S.TitleContainer>

      {/* 캘린더 이름 */}
      <S.RowContainer $noBorder>
        <S.Row>
          <S.Label>캘린더 이름</S.Label>
          <S.Input
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
            maxLength={10}
          />
        </S.Row>
      </S.RowContainer>

      {/* 초대 기능 (삭제 시 생략 가능) */}
      {showInviteSection && (
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
      )}

      {/* 하단 버튼 및 멤버 리스트 */}
      <S.ContentContainer>
        {showInviteSection && (
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
        )}

        <S.ButtonGroup>
          <S.ButtonGroup>
            {buttons.map(({ label, onClick, type = "default" }) => (
              <S.ActionButton
                key={label}
                $type={type}
                onClick={() => onClick({ calendarName, invitedMembers })}
              >
                {label}
              </S.ActionButton>
            ))}
          </S.ButtonGroup>
        </S.ButtonGroup>
      </S.ContentContainer>
    </S.Container>
  );
};

export default CalendarForm;
