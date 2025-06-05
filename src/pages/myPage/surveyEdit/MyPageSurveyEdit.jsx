import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPageSurveyEdit = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const ownerId = id;
  // 로그인된 유저정보
  const {currentUser} = useSelector((state) => state.member)
  // 로그인된 유저의 아이디
  const memberId = currentUser.id;
  // 설문조사 정보를 담는 변수
  const [surveyList, setSurveyList] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    // currentUser가 아직 undefined일 때 렌더 보호
    if (!currentUser) return;
    // 타입 통일 (둘 다 string으로)
    if (String(ownerId) !== String(memberId)) {
      navigate(`/main/mypage/${ownerId}`, { replace: true });
    }
  }, [memberId, navigate, ownerId, currentUser]);

  // 비구조 할당으로 key값으로 매핑한 추천정보의 묶음
  const categories = ['운동', '음식', '음악', '영화', '독서', '패션', '여행'];
  
  useEffect(() => {
    const getSurvey = async() => {
      const response = await fetch(`http://localhost:10000/surveys/api/list?memberId=${ownerId}`, {
        method: "POST"
      })
      const datas = await response.json()

      const grouped = datas.reduce((item, i) => {
        const key = i.interestType;
        if (!item[key]) {
          item[key] = [];
        }
        item[key].push(i);
        return item;
      }, {});
      
      setSurveyList(grouped)
    }
    getSurvey()
  }, [ownerId])

  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>내가 선택한 추천 정보를 확인해보세요.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
            <span>추천 정보 수정 🔄</span>
            <NavLink to={'/survey/intro'}>
              <S.TitleTopLinkText>
                추천 정보 수정하러 가기 &gt;&gt;
              </S.TitleTopLinkText>
            </NavLink>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          {categories.map((category) => (
            surveyList[category] && (
              <S.CategoryBox key={category}>
                <S.CategoryTitle>{category}</S.CategoryTitle>
                <S.CategoryList>
                  {surveyList[category].map((item, idx) => (
                    <S.CategoryItem key={item.id || idx}>
                      #{item.interestDetailValue}
                    </S.CategoryItem>
                  ))}
                </S.CategoryList>
              </S.CategoryBox>
            )
          ))}
        </S.BodyContainer>
      </S.MainContainer>
    </div>
  );
};

export default MyPageSurveyEdit;