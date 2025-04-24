import React, { useContext } from 'react';
import { SurveyContext } from '../../../context/SurveyContext';
import { useNavigate } from 'react-router-dom';

const SurveyPrevDetailButton = () => {

  const navigate = useNavigate()
  const { state, actions } = useContext(SurveyContext)
  const { removeDetails } = actions
  const { details, confirmCategorys } = state
  const { detail, current } = details;
  
  const currentType = confirmCategorys[confirmCategorys.length - 1]
  const prev = details.detail.indexOf(current[current.length - 1]) - 1
  const prevLocation = detail[prev]

  const onClickToRemoveAndNavigate = () => {
    
    removeDetails(current[current.length - 1])
    navigate(`/survey/${currentType}/${prevLocation}`)
  }

  return (
    <button onClick={onClickToRemoveAndNavigate}>
      디테일 이전으로
    </button>
  );
};

export default SurveyPrevDetailButton;