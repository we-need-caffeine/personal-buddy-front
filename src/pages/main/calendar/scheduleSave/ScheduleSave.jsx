import React, { useState } from "react";
import S from "./style";

const ScheduleSave = () => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [color, setColor] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [repeat, setRepeat] = useState("");
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);

  const mainCategories = ["개인", "업무", "취미"];
  const subCategories = {
    개인: ["운동", "독서", "명상"],
    업무: ["회의", "보고", "개발"],
    취미: ["게임", "음악", "여행"],
  };

  const colors = ["green", "yellow", "pink", "red", "blue"];
  const members = ["장재영", "양진영", "함지현"];
  const repeatOptions = ["없음", "매일", "매주", "선택한 날짜의 요일"];

  const toggleMember = (name) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.TitleInput placeholder="제목을 입력하세요" />
      </S.TitleInputContainer>

      <S.DateContainer>
        <S.DateSectionGroup>
          <S.DateSection>
            <S.DateTextLabel>시작</S.DateTextLabel>
            <S.DateInputWrapper>
              <S.DateInput />
              <S.DateInputTime />
            </S.DateInputWrapper>
          </S.DateSection>
          <S.DateSection>
            종료
            <S.DateInputWrapper>
              <S.DateInput />
              <S.DateInputTime />
            </S.DateInputWrapper>
          </S.DateSection>
        </S.DateSectionGroup>
      </S.DateContainer>

      <S.ContentContainer>
        <S.ContentWrapper>
          <S.ContentFormGroup>
            {/* 색상 드롭다운 */}
            <S.ContentRow>
              색
              <S.MemberDropdownContainer>
                <S.MemberSelectBox
                  onClick={() => setColorDropdownOpen((prev) => !prev)}
                >
                  {color ? color : "색상 선택"}
                </S.MemberSelectBox>
                {colorDropdownOpen && (
                  <S.MemberDropdownList>
                    {colors.map((c) => (
                      <S.MemberItem
                        key={c}
                        onClick={() => {
                          setColor(c);
                          setColorDropdownOpen(false);
                        }}
                      >
                        <S.ColorCircle color={c} />
                        <S.MemberName>{c}</S.MemberName>
                        <S.CheckIcon checked={color === c} />
                      </S.MemberItem>
                    ))}
                  </S.MemberDropdownList>
                )}
              </S.MemberDropdownContainer>
            </S.ContentRow>

            {/* 멤버 드롭다운 */}
            <S.ContentRow>
              멤버
              <S.MemberDropdownContainer>
                <S.MemberSelectBox
                  onClick={() => setMemberDropdownOpen(!memberDropdownOpen)}
                >
                  캘린더 멤버 ({selectedMembers.length})
                </S.MemberSelectBox>
                {memberDropdownOpen && (
                  <S.MemberDropdownList>
                    {members.map((m) => (
                      <S.MemberItem key={m} onClick={() => toggleMember(m)}>
                        <S.ProfileIcon />
                        <S.MemberName>{m}</S.MemberName>
                        <S.CheckIcon checked={selectedMembers.includes(m)} />
                      </S.MemberItem>
                    ))}
                  </S.MemberDropdownList>
                )}
              </S.MemberDropdownContainer>
            </S.ContentRow>

            {/* ✅ 커스텀 드롭다운 카테고리 */}
            <S.ContentRow>
              카테고리
              <S.ContentCategoryWrapper>
                {/* 상위 카테고리 */}
                <S.CustomDropdownContainer>
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

                {/* 하위 카테고리 */}
                <S.CustomDropdownContainer>
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
                          key={item}
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

            {/* 장소 */}
            <S.ContentRow>
              장소
              <S.ContentRowInput />
            </S.ContentRow>

            {/* 반복 */}
            <S.ContentRow>
              반복
              <S.Select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
              >
                {repeatOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </S.Select>
            </S.ContentRow>

            {/* 내용 */}
            <S.ContentRowTextArea>
              내용
              <S.ContentRowTextInput />
            </S.ContentRowTextArea>
          </S.ContentFormGroup>

          <S.ButtonGroup>
            <S.SaveButton>저장</S.SaveButton>
            <S.CancelButton>취소</S.CancelButton>
          </S.ButtonGroup>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default ScheduleSave;
