import React from 'react';
import { Link } from 'react-router-dom';

const SurveyIntroContainer = () => {
  return (
    <div>
      <div>무조건 시작하세요^^</div>
      <div>
        <Link to={"/survey"}>[설문조사 시작하기]</Link>
      </div>
    </div>
  );
};

export default SurveyIntroContainer;