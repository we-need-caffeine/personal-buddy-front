import React, { useContext } from 'react';
import { SurveyContext } from '../../../context/SurveyContext';
import { useNavigate } from 'react-router-dom';

const SurveyNextDetailButton = () => {
  const { state, actions } = useContext(SurveyContext)
  const { details } = state;
  const { current } = details
  const { insertDetails } = actions;

  const navigate = useNavigate();

  const onClickToAddDetailAndNavigate = () => {
    let nextLocation = ""
    if(current.length === 0){
      nextLocation = details.detail[1]
    }else if(current.length === 1){
      nextLocation = details.detail[2]
    }else {
      console.log("노출되지 않음")
    }
    insertDetails(nextLocation)
    navigate(`${nextLocation}`)
  } 

  return (
    <button onClick={onClickToAddDetailAndNavigate}>
      디테일 다음으로
    </button>
  );

};

export default SurveyNextDetailButton;