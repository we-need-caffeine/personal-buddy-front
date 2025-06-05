import React, { useState, useEffect, useRef } from "react";
import S from "./style";

const CalendarForm = ({
  initialName = "",
  calendarId,
  initialInvited = [],
  setInvitedMembers, // 부모 set 함수 받기!
  allMembers = [],
  currentMembers = [],
  showInviteSection = true,
  removeMember,
  buttons = [],
  refreshAvailableMembers,
  isUpdateMode = false,
  memberId,
}) => {
  const [calendarName, setCalendarName] = useState(initialName);
  const [localInvitedMembers, setLocalInvitedMembers] = useState(initialInvited);
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

  const toggleInvite = async (member) => {
    const newMember = {
      memberId: member.memberId ?? member.id,
      memberName: member.memberName,
      memberImgName: member.memberImgName,
      memberImgPath: member.memberImgPath,
    };

    if (!localInvitedMembers.some((m) => (m.memberId ?? m.id) === newMember.memberId)) {
      try {
        if (isUpdateMode) {
          await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/calendars/api/members/invites/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                calendarInviteInvitedMemberId: newMember.memberId,
                calendarInviteHostId: Number(memberId),
                calendarInviteIsApproved: 0,
                calendarId: Number(calendarId),
              }),
            }
          );
          alert(`${newMember.memberName}님 초대 완료`);
        }

        const newMembers = [...localInvitedMembers, newMember];
        setLocalInvitedMembers(newMembers); // 내부 state
        setInvitedMembers(newMembers); // 부모 state
      } catch (error) {
        console.error("초대 요청 실패:", error);
        alert("초대 요청 중 오류가 발생했습니다.");
      }
    }
  };

  // 초대 취소 (API 호출)
  const cancelInvite = async (inviteMemberId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/calendars/api/invites/members/${inviteMemberId}/calendars/${calendarId}/cancel`,
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

  // initialInvited 디버그
  console.log(currentMembers);

  useEffect(() => {
    setLocalInvitedMembers(initialInvited);
  }, [initialInvited]);

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
                    const memberKey = member.memberId ?? member.id;
                    const isWaiting = member.inviteStatus === "초대대기중";

                    const isInvited =
                      localInvitedMembers.some(
                        (m) => (m.memberId ?? m.id) === memberKey
                      ) || isWaiting;

                    return (
                      <S.DropdownItem key={memberKey}>
                        <S.Left>
                          <S.MemberImage
                            src={`${process.env.REACT_APP_BACKEND_URL}/${member.memberImgPath}/${member.memberImgName}`}
                            alt={member.memberName}
                          />
                          <S.DropdownName>{member.memberName}</S.DropdownName>
                        </S.Left>

                        <S.InviteButton
                          onClick={() =>
                            isWaiting
                              ? cancelInvite(memberKey)
                              : toggleInvite(member)
                          }
                          disabled={isWaiting || isInvited}
                        >
                          {isWaiting
                            ? "초대 취소"
                            : isInvited
                            ? "초대됨"
                            : "초대"}
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
        {showInviteSection && currentMembers?.length > 0 && (
          <S.MemberList>
            <S.MemberListTitle>
              <span>참여 중인 멤버</span> ({currentMembers.length})
            </S.MemberListTitle>
            {currentMembers
              .filter(
                (member) => (member.memberId ?? member.id) !== Number(memberId)
              )
              .map((member) => {
                const memberKey = member.memberId ?? member.id;

                return (
                  <S.MemberItem key={memberKey}>
                    <S.MemberInfoContainer>
                      <S.MemberImage
                        src={`${process.env.REACT_APP_BACKEND_URL}/${member.memberImgPath}/${member.memberImgName}`}
                        alt={member.memberName}
                      />
                      <S.MemberName>{member.memberName}</S.MemberName>
                    </S.MemberInfoContainer>

                    {/* 호스트가 아닐 때만 추방하기 버튼 노출 */}
                    {member.calendarMemberIsHost === 0 && (
                      <S.RemoveButton
                        onClick={() => removeMember(memberKey)}
                      >
                        추방하기
                      </S.RemoveButton>
                    )}
                  </S.MemberItem>
                );
              })}
          </S.MemberList>
        )}

        <S.ButtonGroup>
          {buttons.map(
            ({ label, onClick, type = "default", disabled = false }, index) => (
              <S.ActionButton
                key={index}
                $type={type}
                onClick={() =>
                  onClick({
                    calendarName,
                    invitedMembers: localInvitedMembers,
                  })
                }
                className={`button ${type} ${disabled ? "disabled" : ""}`}
                disabled={disabled}
              >
                {label}
              </S.ActionButton>
            )
          )}
        </S.ButtonGroup>
      </S.ContentContainer>
    </S.Container>
  );
};

export default CalendarForm;
