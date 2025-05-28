import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Redux 추가
import { SurveyContext } from '../../../../context/SurveyContext';
import S from '../style';

// 소분류 데이터
const subCategoryMap = {
  food: ['한식', '양식', '중식', '분식', '디저트', '커피', '채식', '다이어트'],
  health: ['헬스', '축구', '야구', '배드민턴', '테니스', '풋살', '탁구', '볼링', '러닝'],
  music: ['국내발라드', 'K-POP', 'J-POP', '국내 R&B', '해외 R&B', '국내 락', '해외 락', '국내 힙합', '해외 힙합'],
  movie: ['액션', '코미디', '공포', '드라마', '스릴러', 'SF', '로맨스', '애니메이션', '판타지', '시대극'],
  book: ['베스트셀러', '소설', '에세이', '자기계발', '경제', '인문', '어린이', '시', '만화 '],
  fashion: ['미니멀', '스트릿', 'Y2K', '시티보이', '테크웨어', '댄디'],
  travel: ['캠핑', '드라이브', '등산', '글램핑', '전시회', '바다', '산책', '야경'],
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

const SurveyDetailInfo = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useContext(SurveyContext);  // Context에서 state, actions 가져오기
  const { insertDetails, setCurrentUser } = actions;

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { currentUser } = useSelector((state) => state.member);  // Redux에서 currentUser 가져오기

  const categoryName = categoryReverseMap[category] || category;

  useEffect(() => {
    // Redux의 currentUser.id가 있으면 Context에 저장
    if (currentUser && currentUser.id) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];
    if (storedCategories.length === 0) {
      alert('잘못된 접근입니다. \n다시 검사해주세요. 😅');
      navigate('/survey');
    } else {
      setSelectedCategories(storedCategories);
    }
  }, [navigate]);

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
    
    insertDetails({ category, section: 'info', values: selectedTags });
    navigate(`/survey/${category}/place`);
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const subTags = subCategoryMap[category] || [];

  if (selectedCategories.length === 0) return null;

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>
          {categoryName}에 관심이 있으신가요?<br />맞춤형 정보를 위해 선택해주세요.
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
            <S.PrevBtn type="button" onClick={handlePrev}>이전 단계로</S.PrevBtn>
            <S.NextBtn type="button" onClick={handleNext}>다음으로</S.NextBtn>
          </S.NextBtnWrapper>
        </S.RightWrapper>
      </S.Right>
    </S.Container>
  );
};

export default SurveyDetailInfo;
