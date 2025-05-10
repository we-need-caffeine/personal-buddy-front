import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';

// 나중에 Context나 Redux로 바꾸기
const isLogin = true; // true면 로그인 상태(main으로 이동), false면 로그아웃 상태(member/login으로 이동)

const LoginLayout = () => {
  console.log(1)

  // 쿼리스트링에서 토큰 분리
  const [searchParams] = useSearchParams()
  const jwtToken = searchParams.get("jwtToken")
  const localJwtToken = localStorage.getItem("jwtToken")

  const navigate = useNavigate();

  console.log(localJwtToken)

  useEffect(() => {
    // 만약 쿼리스트링에 토큰이 있다면, 로컬스토리지에 저장
    if(jwtToken) {
      localStorage.setItem("jwtToken", jwtToken)
      navigate("/main", {replace : true})
    }

  }, [localJwtToken])

  // if(jwtToken) {
  //   localStorage.setItem("jwtToken", jwtToken)
  //   navigate("/main", {replace : true})
  // }
  

  if (!isLogin) {
    return <Navigate to="/member/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
