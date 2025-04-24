import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../../../context/SurveyContext';

const SurveyPrevTypeButton = () => {
  const navigate = useNavigate()
  const { state, actions } = useContext(SurveyContext)
  const { removeConfirm, insertBeforeDetails } = actions 
  const { categorys, confirmCategorys } = state

  const currentCategory = categorys[confirmCategorys.length - 1]
  const prevCategory = categorys[confirmCategorys.length - 2]

  const onClickPrevCategory = () => {
    removeConfirm(currentCategory)
      if(confirmCategorys.length === 1){
        navigate("/survey")
      }else {
        insertBeforeDetails()
        navigate("/survey/" + prevCategory)
      }
    }

  return (
    <button onClick={onClickPrevCategory}>타입 이전으로</button>
  );
};

export default SurveyPrevTypeButton;