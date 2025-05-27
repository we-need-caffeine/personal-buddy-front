import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Redux에서 currentUser 가져오기
import { SurveyContext } from '../../../context/SurveyContext';
import S from './style';

// 카테고리 한글 ↔ 영문 매핑
const categoryMap = {
  '음식': 'food',
  '운동': 'health',
  '음악': 'music',
  '영화': 'movie',
  '독서': 'book',
  '패션': 'fashion',
  '여행': 'travel',
};

const categories = Object.keys(categoryMap); // 한글 리스트로 구성

const SurveyType = () => {
  const { actions } = useContext(SurveyContext);
  const { insert, insertConfirm, setCurrentUser } = actions; // setCurrentUser 추가
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.member);  // Redux에서 currentUser 가져오기

  useEffect(() => {
    // Redux의 currentUser가 있으면 Context에도 저장
    if (currentUser && currentUser.id) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  const handleClickTag = (tag) => {
    setSelectedCategories((prev) =>
      prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
    );
  };

  const handleNext = () => {
    if (selectedCategories.length < 3) {
      alert('관심사를 최소 3개 이상 선택해주세요.');
      return;
    }

    const englishCategories = selectedCategories.map(tag => categoryMap[tag]);

    // Context 및 localStorage에 카테고리 저장
    insert(englishCategories);
    insertConfirm(englishCategories[0]); // 첫 번째 카테고리 확정
    localStorage.setItem('selectedCategories', JSON.stringify(englishCategories));

    // 첫 번째 카테고리로 이동
    navigate(`/survey/${englishCategories[0]}`);
  };

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>
          더 나은 맞춤형 경험을 위해 당신의 관심사를<br />
          알려주세요! 선택해주신 관심사를 바탕으로<br />
          유용한 정보와 맞춤형 추천을 제공해드립니다.
        </S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>

      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>0. 관심사를 선택해 주세요</S.MainTitle>
            <S.SubTitle><span>*필수 </span>최소 3개 이상</S.SubTitle>

            <S.Tags>
              {categories.map((tag, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedCategories.includes(tag) ? 'selected' : ''}
                  onClick={() => handleClickTag(tag)}
                >
                  {tag}
                </S.Tag>
              ))}
            </S.Tags>
          </div>

          <S.NextBtnWrapper>
            <S.NextBtn type="button" onClick={handleNext}>다음으로</S.NextBtn>
          </S.NextBtnWrapper>
        </S.RightWrapper>
      </S.Right>
    </S.Container>
  );
};

export default SurveyType;
