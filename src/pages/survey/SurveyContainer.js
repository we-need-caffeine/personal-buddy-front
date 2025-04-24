import React from 'react';
import { Outlet } from 'react-router-dom';
import { SurveyProvider } from '../../context/SurveyContext';

const SurveyContainer = () => {
  return (
    <SurveyProvider>
      <Outlet />
    </SurveyProvider>
  );
};

export default SurveyContainer;