import React from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Image src="/assets/images/error/404ERROR.png" alt="404에러 이미지" />
      <S.BackButton onClick={() => navigate('/')}>
        메인 페이지로 돌아가기
      </S.BackButton>
    </S.Container>
  );
};

export default NotFound;