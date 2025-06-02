import React, { useState, useEffect, useRef } from "react";
import S from "./style";

const CalendarForm = ({
  initialName = "",
  calendarId,
  initialInvited = [],
  allMembers = [],
  currentMembers = [],
  showInviteSection = true,
  removeMember,
  buttons = [],
  refreshAvailableMembers,
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

  const cancelInvite = async (memberId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/cancel/members/${memberId}/calendars/${calendarId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("초대 취소 성공");
        await refreshAvailableMembers(); 
      } else {
        alert("초대 취소 실패");
      }
    } catch (error) {
      console.error("초대 취소 오류:", error);
      alert("초대 취소 중 오류 발생");
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

      {/* 초대 기능 */}
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
                    const isWaiting = member.inviteStatus === "초대대기중";
                    const isInvited = invitedMembers.some(
                      (m) => m.memberId === member.memberId
                    ); // 초대한 경우

                    return (
                      <S.DropdownItem key={member.memberId}>
                        <S.Left>
                          <S.MemberImage
                            src={`${process.env.REACT_APP_BACKEND_URL}/${member.memberImgPath}/${member.memberImgName}`}
                            alt={member.memberName}
                          />
                          <S.DropdownName>{member.memberName}</S.DropdownName>
                        </S.Left>

                        {/* 버튼 조건 */}
                        {isWaiting ? (
                          <S.InviteButton
                            onClick={() => cancelInvite(member.memberId)}
                            disabled={false} // 이제 가능
                          >
                            초대 취소
                          </S.InviteButton>
                        ) : (
                          <S.InviteButton
                            onClick={() => toggleInvite(member)}
                            disabled={isInvited}
                          >
                            {isInvited ? "초대됨" : "초대"}
                          </S.InviteButton>
                        )}
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
        {showInviteSection && currentMembers?.length > 0 && (
          <S.MemberList>
            <S.MemberListTitle>
              참여 중인 멤버 ({currentMembers.length})
            </S.MemberListTitle>
            {currentMembers.map((member) => (
              <S.MemberItem key={member.id}>
                <S.MemberInfoContainer>
                  <S.MemberImage
                    src={`${process.env.REACT_APP_BACKEND_URL}/${member.memberImgPath}/${member.memberImgName}`}
                    alt={member.memberName}
                  />
                  <S.MemberName>{member.memberName}</S.MemberName>
                </S.MemberInfoContainer>
                <S.RemoveButton onClick={() => removeMember(member.id)}>
                  추방하기
                </S.RemoveButton>
              </S.MemberItem>
            ))}
          </S.MemberList>
        )}

        <S.ButtonGroup>
          <S.ButtonGroup>
            {buttons.map(
              ({ label, onClick, type = "default", disabled = false }) => (
                <S.ActionButton
                  key={label}
                  $type={type}
                  onClick={() => onClick({ calendarName, invitedMembers })}
                  className={`button ${type} ${disabled ? "disabled" : ""}`}
                  disabled={disabled}
                >
                  {label}
                </S.ActionButton>
              )
            )}
          </S.ButtonGroup>
        </S.ButtonGroup>
      </S.ContentContainer>
    </S.Container>
  );
};

export default CalendarForm;
