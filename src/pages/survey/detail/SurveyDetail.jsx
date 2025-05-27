import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';
import S from './style';

const subCategoryMap = {
  food: ['한식', '양식', '중식'],
  music: ['팝', '락', '힙합'],
  movie: ['액션', '코미디', '드라마'],
  travel: ['국내여행', '해외여행'],
};

const categoryReverseMap = {
  food: '음식',
  health: '운동',
  music: '음악',
  movie: '영화',
  book: '독서',
  fashion: '패션',
  travel: '여행',
};

const SurveyDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(SurveyContext);
  const [selectedTags, setSelectedTags] = useState([]);

  const categoryKey = category?.toLowerCase().replace(/\/$/, '');
  const categoryName = categoryReverseMap[categoryKey] || categoryKey;

  const { confirmCategorys } = state || {};

  useEffect(() => {
    if (
      !confirmCategorys ||
      confirmCategorys.length === 0 ||
      !confirmCategorys.includes(categoryKey)
    ) {
      alert('잘못된 접근입니다. \n다시 검사해주세요. 😅');
      navigate('/survey');
    }
  }, [confirmCategorys, navigate, categoryKey]);

  const handleClickTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
    );
  };

  const handleNext = () => {
    if (selectedTags.length < 1) {
      alert('소분류를 하나 이상 선택해주세요.');
      return;
    }
    navigate(`/survey/${categoryKey}/place`);
  };

  const subTags = subCategoryMap[categoryKey] || [];

  return (
    <S.Container>
      {subTags.length > 0 ? (
        <>
          <S.Left>
            <S.SpeechBubble>
              {categoryName} 설문<br />소분류를 선택해주세요!
            </S.SpeechBubble>
            <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
          </S.Left>

          <S.Right>
            <S.RightWrapper>
              <div>
                <S.MainTitle>1. {categoryName} 세부 선택</S.MainTitle>
                <S.SubTitle><span>*필수 </span>최소 1개 이상</S.SubTitle>
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
                <S.NextBtn type="button" onClick={handleNext}>다음으로</S.NextBtn>
              </S.NextBtnWrapper>
            </S.RightWrapper>
          </S.Right>
        </>
      ) : (
        <Outlet /> 
      )}
    </S.Container>
  );
};

export default SurveyDetail;
