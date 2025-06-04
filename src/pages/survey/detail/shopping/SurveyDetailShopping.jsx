import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import { SurveyContext } from '../../../../context/SurveyContext';

const shoppingOptionsMap = {
  food: ['간식', '밀키트', '음료', '주류', '냉동식품', '베이커리'],
  health: ['운동기구', '운동장비', '축구장비', '야구장비', '탁구장비', '배드민턴장비', '테니스장비'],
  music: ['앨범', '헤드셋', '블루투스 스피커', '턴테이블', 'LP판', '이어폰'],
  movie: ['영화 굿즈', 'DVD', '빔프로젝터', '사운드바', '스낵'],
  fashion: ['상의', '하의', '아우터', '신발', '가방','액세서리', '언더웨어', '잠옷', '주얼리'],
  travel: ['캐리어', '가방', '캠핑장비', '전자기기', '의약품', '등산복', '가이드북'],
  book: ['책갈피', '책 커버', '책장', '독서대', '노트', '방석'],
};

const categoryReverseMap = {
  food: '음식', health: '운동', music: '음악', movie: '영화',
  book: '독서', fashion: '패션', travel: '여행',
};

const SurveyDetailShopping = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useContext(SurveyContext);
  const [selectedShoppings, setSelectedShoppings] = useState([]);
  const [isLastCategory, setIsLastCategory] = useState(false);

  const { currentUser } = useSelector((state) => state.member);
  const memberId = currentUser.id;

  // Redux의 currentUser를 Context로 동기화
  useEffect(() => {
    if (currentUser && currentUser.id) {
      actions.setCurrentUser(currentUser);
    }
  }, [currentUser, actions]);

  const categoryName = categoryReverseMap[category] || category;

  useEffect(() => {
    const storedCategories = state.categorys.length > 0 ? state.categorys : JSON.parse(localStorage.getItem('surveyCategorys') || '[]');
    if (!storedCategories || storedCategories.length === 0) {
      alert('잘못된 접근입니다. \n다시 검사해주세요. 😅');
      navigate('/survey/intro');
      return;
    }
    setIsLastCategory(storedCategories.indexOf(category) === storedCategories.length - 1);
  }, [category, navigate, state.categorys]);

  const handleClickTag = (item) => {
    setSelectedShoppings((prev) =>
      prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item]
    );
  };

  const handleNext = async () => {
    if (selectedShoppings.length === 0) {
      alert('쇼핑 항목을 하나 이상 선택해주세요.');
      return;
    }

    const updatedDetails = { ...state.details, [category]: { ...state.details[category], shopping: selectedShoppings }};
    actions.insertDetails({ category, section: 'shopping', values: selectedShoppings });
    localStorage.setItem('surveyDetails', JSON.stringify(updatedDetails));
    localStorage.setItem('surveyCategorys', JSON.stringify(state.categorys));

    const currentIndex = state.categorys.indexOf(category);
    const nextCategory = state.categorys[currentIndex + 1];

    if (nextCategory) {
      navigate(`/survey/${nextCategory}`);
    } else {
      try {
        const surveyDetails = Object.entries(updatedDetails).flatMap(([cat, sections]) =>
          Object.entries(sections).flatMap(([section, values]) =>
            values.map(value => ({
              interestType: categoryReverseMap[cat],
              interestDetailSection: section,
              interestDetailValue: value,
              memberId: memberId
            }))
          )
        );

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/surveys/api/insert/${memberId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(surveyDetails)
        });

        if (response.ok) {
          alert('설문이 정상적으로 완료되었습니다!');
          actions.resetDetails();
          localStorage.removeItem('surveyCategorys');
          localStorage.removeItem('surveyDetails');
          navigate('/main');
        } else {
          const errorData = await response.json();
          console.error('서버 오류:', errorData);
          alert('설문 전송에 실패했습니다.');
        }
      } catch (error) {
        console.error('네트워크 오류:', error);
        alert('설문 전송에 실패했습니다.');
      }
    }
  };

  const handlePrev = () => navigate(-1);

  const shoppingOptions = shoppingOptionsMap[category] || [];
  if (!state.categorys || state.categorys.length === 0) return null;

  return (
    <S.Container>
      <S.Left>
        <S.SpeechBubble>{categoryName} 설문<br />쇼핑 항목을 선택해주세요!</S.SpeechBubble>
        <S.LogoImg src="/assets/images/logo/buddy-logo.png" alt="로고 이미지" />
      </S.Left>
      <S.Right>
        <S.RightWrapper>
          <div>
            <S.MainTitle>3. {categoryName} 쇼핑 선택</S.MainTitle>
            <S.SubTitle><span>*필수 </span>최소 1개 이상</S.SubTitle>
            <S.Tags>
              {shoppingOptions.map((item, idx) => (
                <S.Tag
                  key={idx}
                  className={selectedShoppings.includes(item) ? 'selected' : ''}
                  onClick={() => handleClickTag(item)}
                >{item}</S.Tag>
              ))}
            </S.Tags>
          </div>
          <S.NextBtnWrapper>
            <S.PrevBtn onClick={handlePrev}>이전 단계로</S.PrevBtn>
            <S.NextBtn onClick={handleNext}>
              {isLastCategory ? '설문 종료' : '다음으로'}
            </S.NextBtn>
          </S.NextBtnWrapper>
        </S.RightWrapper>
      </S.Right>
    </S.Container>
  );
};

export default SurveyDetailShopping;
