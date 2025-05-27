import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import S from './style';

const placeOptionsMap = {
  food: ['카페', '공원', '도서관'],
  music: ['공연장', '클럽', '연습실'],
  movie: ['영화관', '소극장', '상영관'],
  travel: ['국내여행지', '해외여행지'],
  // 필요한 카테고리 추가
};

const SurveyDetailPlace = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];
    if (storedCategories.length === 0) {
      alert('잘못된 접근입니다. \n다시 검사해주세요. 😅');
      navigate('/survey');
    } else {
      setSelectedCategories(storedCategories);
    }
  }, [navigate]);

  if (selectedCategories.length === 0) return null;

  const handleClickTag = (place) => {
    setSelectedPlace(place);
  };

  const handleNext = () => {
    if (!selectedPlace) {
      alert('장소를 선택해주세요.');
      return;
    }

    console.log(`선택한 장소: ${selectedPlace}`);
    navigate(`/survey/${category}/shopping`);
  };

  const placeOptions = placeOptionsMap[category] || [];

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>
          {category} 설문<br />Place 단계
        </S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>

      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>2. {category} 장소 선택</S.MainTitle>
            <S.Tags>
              {placeOptions.map((place, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedPlace === place ? 'selected' : ''}
                  onClick={() => handleClickTag(place)}
                >
                  {place}
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

export default SurveyDetailPlace;
