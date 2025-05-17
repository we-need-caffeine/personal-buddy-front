import React, { useState } from "react";
import S from "./style";
import BasicButton from "../../../../components/button/BasicButton"; // 실제 경로에 맞게 조정

const CalendarSave = () => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [member, setMember] = useState("");
  const [repeat, setRepeat] = useState("");

  const mainCategories = ["개인", "업무", "취미"];
  const subCategories = {
    개인: ["운동", "독서", "명상"],
    업무: ["회의", "보고", "개발"],
    취미: ["게임", "음악", "여행"],
  };

  const colors = ["green", "yellow", "pink", "red", "blue"];
  const members = ["김코딩", "이자바", "박리액트"]; // DB 연동 전 예시
  const repeatOptions = ["없음", "매일", "매주", "선택한 날짜의 요일"];

  return (
    <S.Container>
      <S.TitleInputContainer>
        <S.TitleInput placeholder="제목을 입력하세요" />
      </S.TitleInputContainer>

      <S.DateContainer>
        <S.DateSectionGroup>
          <S.DateSection>
            시작
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
            <S.ContentRow>
              색
              <S.Select value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">선택</option>
                {colors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </S.Select>
            </S.ContentRow>

            <S.ContentRow>
              멤버
              <S.Select value={member} onChange={(e) => setMember(e.target.value)}>
                <option value="">선택</option>
                {members.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </S.Select>
            </S.ContentRow>

            <S.ContentRow>
              카테고리
              <S.ContentCategoryWrapper>
                <S.Select
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                >
                  <option value="">상위 선택</option>
                  {mainCategories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </S.Select>

                <S.Select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  disabled={!mainCategory}
                >
                  <option value="">하위 선택</option>
                  {mainCategory &&
                    subCategories[mainCategory].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                </S.Select>
              </S.ContentCategoryWrapper>
            </S.ContentRow>

            <S.ContentRow>
              장소
              <S.ContentRowInput />
            </S.ContentRow>

            <S.ContentRow>
              반복
              <S.Select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
                {repeatOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </S.Select>
            </S.ContentRow>

            <S.ContentRowTextArea>
              내용
              <S.ContentRowTextInput />
            </S.ContentRowTextArea>
          </S.ContentFormGroup>

          <S.ButtonGroup>
            <BasicButton
              variant="main"
              font="h1"
              color="white"
              size="meduim"
              shape="small"
            >
              저장
            </BasicButton>
            <BasicButton
              variant="white"
              font="h1"
              color="black"
              size="meduim"
              shape="small"
            >
              취소
            </BasicButton>
          </S.ButtonGroup>
        </S.ContentWrapper>
      </S.ContentContainer>
    </S.Container>
  );
};

export default CalendarSave;