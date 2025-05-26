import React from 'react';
import { Outlet } from 'react-router-dom';

const SurveyLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SurveyLayout;
