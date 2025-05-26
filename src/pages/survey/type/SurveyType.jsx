import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';
import S from './style';

const categoryMap = {
  '음식': 'food',
  '운동': 'health',
  '음악': 'music',
  '영화': 'movie',
  '독서': 'book',
  '패션': 'fashion',
  '여행': 'travel',
};

const categories = Object.keys(categoryMap);

const SurveyType = () => {
  const { actions } = useContext(SurveyContext);
  const { insert, insertConfirm } = actions;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleClickTag = (tag) => {
    if (selectedCategories.includes(tag)) {
      setSelectedCategories(selectedCategories.filter(item => item !== tag));
    } else {
      setSelectedCategories([...selectedCategories, tag]);
    }
  };

  const handleNext = () => {
    if (selectedCategories.length < 2) {
      alert('관심사를 최소 2개 이상 선택해주세요.');
      return;
    }

    insert(selectedCategories);
    insertConfirm(selectedCategories[0]);

    const englishCategories = selectedCategories.map(tag => categoryMap[tag]);

    // localStorage에 선택 카테고리 배열 저장 (JSON.stringify)
    try {
      localStorage.setItem('selectedCategories', JSON.stringify(englishCategories));
    } catch (err) {
      console.error('로컬스토리지 저장 실패:', err);
    }

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
            <S.SubTitle><span>*필수 </span>최소 2개 이상</S.SubTitle>

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
