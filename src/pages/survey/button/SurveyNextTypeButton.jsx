import React, { useContext } from 'react';
import { SurveyContext } from '../../../context/SurveyContext';
import { useNavigate } from 'react-router-dom';

const SurveyNextTypeButton = () => {
  const navigate = useNavigate()
  const { state, actions } = useContext(SurveyContext)
  const { insertConfirm, resetDetails } = actions;
  const { categorys, confirmCategorys } = state;

  const isNext = confirmCategorys.length < categorys.length;
  const nextCategory = categorys[confirmCategorys.length];

  const onClickNextCategory = () => {
    insertConfirm(nextCategory)
    resetDetails()
    navigate("/survey/" + nextCategory);
  }

  const complete = () => {
    // fetch api 요청해서 등록 후 메인페이지
  }

  return (
    <div>
      {isNext ? (
        <button onClick={onClickNextCategory}>다음으로</button>
      ) : (
        <button>수고하셨습니다.</button>
      )}
    </div>
  );
};

export default SurveyNextTypeButton;