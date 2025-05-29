import React, { useEffect, useState } from 'react';
import S from './style';
import { NavLink, useParams } from 'react-router-dom';

const MyPageSurveyEdit = () => {

  // 마이페이지 파람에서 id값을 가져오는 훅함수
  const { id } = useParams();
  // 아이디 값을 저장
  const memberId = id;
  // 설문조사 정보를 담는 변수
  const [surveyList, setSurveyList] = useState([]);  

  console.log(surveyList);

  useEffect(() => {
    const getSurvey = async() => {
      const response = await fetch(`http://localhost:10000/surveys/api/list?memberId=${memberId}`, {
        method: "POST"
      })
      const datas = await response.json()

      const grouped = datas.reduce((acc, cur) => {
        const key = cur.interestType;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(cur);
        return acc;
      }, {});
      
      setSurveyList(grouped)
    }
    getSurvey()
  }, [memberId])

  return (
    <div>
      <S.MainContainer>
        {/* 상단 타이틀 영역 */}
        <S.TitleContainer>
          <S.TitleTopContainer>
            <span>내가 선택한 추천 정보를 확인해보세요.</span>
          </S.TitleTopContainer>
          <S.TitleBottomContainer>
              <span>추천 정보 수정</span>
          </S.TitleBottomContainer>
        </S.TitleContainer>
        <S.BodyContainer>
          <NavLink to={'/survey/intro'}>
            <S.UpdateSurveyBtn>
              수정하기
            </S.UpdateSurveyBtn>
          </NavLink>
        </S.BodyContainer>
      </S.MainContainer>
    </div>
  );
};

export default MyPageSurveyEdit;