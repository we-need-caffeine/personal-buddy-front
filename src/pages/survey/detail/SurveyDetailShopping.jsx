import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import S from './style';

const shoppingOptionsMap = {
  food: ['식재료', '주방용품', '식당예약'],
  music: ['음반', '굿즈', '공연티켓'],
  movie: ['영화티켓', '포스터', '굿즈'],
  travel: ['여행상품', '호텔예약', '투어'],
  // 필요한 카테고리 추가
};

const SurveyDetailShopping = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

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

  const handleClickTag = (item) => {
    setSelectedItem(item);
  };

  const handleNext = () => {
    if (!selectedItem) {
      alert('쇼핑 항목을 선택해주세요.');
      return;
    }

    const currentIndex = selectedCategories.indexOf(category);
    const nextIndex = currentIndex + 1;

    if (nextIndex < selectedCategories.length) {
      const nextCategory = selectedCategories[nextIndex];
      navigate(`/survey/${nextCategory}`);
    } else {
      navigate('/main'); // 모든 카테고리 끝나면 메인으로
    }
  };

  const shoppingOptions = shoppingOptionsMap[category] || [];

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>
          {category} 설문<br />Shopping 단계
        </S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>

      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>3. {category} 쇼핑 선택</S.MainTitle>
            <S.Tags>
              {shoppingOptions.map((item, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedItem === item ? 'selected' : ''}
                  onClick={() => handleClickTag(item)}
                >
                  {item}
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

export default SurveyDetailShopping;
