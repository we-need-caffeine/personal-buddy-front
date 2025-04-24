import React, { useContext } from 'react';
import { SurveyContext } from '../../../context/SurveyContext';
import SurveyNextDetailButton from '../button/SurveyNextDetailButton';
import SurveyNextTypeButton from '../button/SurveyNextTypeButton';
import { Outlet } from 'react-router-dom';
import SurveyPrevDetailButton from '../button/SurveyPrevDetailButton';
import SurveyPrevTypeButton from '../button/SurveyPrevTypeButton';

const SurveyFood = () => {
  const { state } = useContext(SurveyContext)
  const { details } = state;

  const isType = details.current.length >= 2;
  const isPrevType = details.current.length === 0;

  return (
    <div>
      <div>
        <Outlet /> 
        음식 페이지
      </div>
      <div>
        { isType ? (
          <SurveyNextTypeButton />
        ) : ( 
          <SurveyNextDetailButton /> 
        )}

        { isPrevType ? (
          <SurveyPrevTypeButton />
        ) : (
          <SurveyPrevDetailButton />
        )}

        
      </div>
    </div>
  );
};

export default SurveyFood;