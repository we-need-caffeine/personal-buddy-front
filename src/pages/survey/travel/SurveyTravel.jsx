import React, { useContext } from 'react';
import { SurveyContext } from '../../../context/SurveyContext';
import { Outlet } from 'react-router-dom';
import SurveyNextTypeButton from '../button/SurveyNextTypeButton';
import SurveyNextDetailButton from '../button/SurveyNextDetailButton';
import SurveyPrevDetailButton from '../button/SurveyPrevDetailButton';
import SurveyPrevTypeButton from '../button/SurveyPrevTypeButton';

const SurveyTravel = () => {
  const {state } = useContext(SurveyContext)
  const { details } = state;

  const isType = details.current.length >= 2;
  const isPrevType = details.current.length === 0;

  return (
    <div>
      <div>
        <Outlet /> 
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
  )
};

export default SurveyTravel;