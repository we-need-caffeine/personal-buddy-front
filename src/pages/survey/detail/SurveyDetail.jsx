import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';
import S from './style';

const subCategoryMap = {
  food: ['한식', '양식', '중식'],
  music: ['팝', '락', '힙합'],
  movie: ['액션', '코미디', '드라마'],
  travel: ['국내여행', '해외여행'],
  // 필요한 카테고리에 맞게 추가
};

const SurveyDetail = () => {
  const { category } = useParams();
  const { state } = useContext(SurveyContext);  // SurveyContext에서 상태 가져오기
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  // selectedCategories와 currentCategoryIndex를 context에서 가져옴
  const { selectedCategories, currentCategoryIndex } = state || {};

  useEffect(() => {
    if (!selectedCategories || selectedCategories.length === 0) {
      alert('잘못된 접근입니다. \n다시 검사해주세요. 😅');
      navigate('/survey');
    }
  }, [selectedCategories, navigate]);

  const handleClickTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleNext = () => {
    if (selectedTags.length < 1) {
      alert('소분류를 하나 이상 선택해주세요.');
      return;
    }

    navigate(`/survey/${category}/place`);
  };

  const subTags = subCategoryMap[category] || [];

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>
          {category} 설문<br />소분류를 선택해주세요!
        </S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>

      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>1. {category} 세부 선택</S.MainTitle>
            <S.SubTitle><span>*필수 </span>하나 이상</S.SubTitle>

            <S.Tags>
              {subTags.map((tag, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedTags.includes(tag) ? 'selected' : ''}
                  onClick={() => handleClickTag(tag)}
                >
                  {tag}
                </S.Tag>
              ))}
            </S.Tags>
          </div>

          <S.NextBtnWrapper>
            <S.NextBtn type="button" onClick={handleNext}>
              다음으로
            </S.NextBtn>
          </S.NextBtnWrapper>
        </S.RightWrapper>
      </S.Right>
    </S.Container>
  );
};

export default SurveyDetail;
