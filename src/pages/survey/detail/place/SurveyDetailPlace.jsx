import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Redux 추가
import { SurveyContext } from '../../../../context/SurveyContext'; // Context 추가
import S from './style';

const placeOptionsMap = {
  food: ['카페', '음식점', '핫플', '전통시장', '체인점'],
  health: ['헬스장', '풋살장', '축구장', '야구장', '테니스장', '배드민턴장', '탁구장'],
  music: ['노래방', '공연장', '콘서트', '연습실', '뮤지컬', 'LP바', '클럽', '라이브 카페'],
  movie: ['CGV', '메가박스', '롯데시네마', '자동차 극장'],
  travel: ['서울', '강원', '강릉', '부산', '전주', '순천', '남이섬', '제주도'],
  fashion: ['백화점', '아울렛', '빈티지샵', '편집샵'],
  book: ['교보문고', '영풍문고', '북카페', '도서관']
};

const categoryReverseMap = {
  food: '음식', health: '운동', music: '음악', movie: '영화',
  book: '독서', fashion: '패션', travel: '여행',
};

const SurveyDetailPlace = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useContext(SurveyContext);
  const { insertDetails, setCurrentUser } = actions;

  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const { currentUser } = useSelector((state) => state.member);  // Redux에서 currentUser 가져오기
  const categoryName = categoryReverseMap[category] || category;

  useEffect(() => {
    // Redux의 currentUser.id가 있으면 Context에 저장
    if (currentUser && currentUser.id) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  const handleClickTag = (place) => {
    setSelectedPlaces((prev) =>
      prev.includes(place) ? prev.filter(p => p !== place) : [...prev, place]
    );
  };

  const handleNext = () => {
    if (selectedPlaces.length === 0) {
      alert('장소를 하나 이상 선택해주세요.');
      return;
    }

    insertDetails({ category, section: 'place', values: selectedPlaces });
    navigate(`/survey/${category}/shopping`);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const placeOptions = placeOptionsMap[category] || [];

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>{categoryName} 설문<br />장소를 선택해주세요.</S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>
      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>2. {categoryName} 장소 선택</S.MainTitle>
            <S.SubTitle><span>*필수 </span>최소 1개 이상</S.SubTitle>
            <S.Tags>
              {placeOptions.map((place, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedPlaces.includes(place) ? 'selected' : ''}
                  onClick={() => handleClickTag(place)}
                >{place}</S.Tag>
              ))}
            </S.Tags>
          </div>
          <S.NextBtnWrapper>
            <S.PrevBtn onClick={handlePrev}>이전 단계로</S.PrevBtn>
            <S.NextBtn onClick={handleNext}>다음으로</S.NextBtn>
          </S.NextBtnWrapper>
        </S.RightWrapper>
      </S.Right>
    </S.Container>
  );
};

export default SurveyDetailPlace;
