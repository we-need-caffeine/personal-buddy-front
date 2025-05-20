import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/member';

// 나중에 Context나 Redux로 바꾸기
const isLogin = true; // true면 로그인 상태(main으로 이동), false면 로그아웃 상태(member/login으로 이동)

const LoginLayout = () => {
  
  // 리덕스
  const { currentUser, isLogin } = useSelector((state) => state.member)
  const dispatch = useDispatch()


  // 쿼리스트링에서 토큰 분리
  const [searchParams] = useSearchParams()
  const jwtToken = searchParams.get("jwtToken")
  const memberId = searchParams.get("id")
  const localJwtToken = localStorage.getItem("jwtToken")

  const navigate = useNavigate();

  // console.log(localJwtToken)

  useEffect(() => {
    // 만약 쿼리스트링에 토큰이 있다면, 로컬스토리지에 저장
    // if(jwtToken) {
    //   localStorage.setItem("jwtToken", jwtToken)
    //   navigate(`/main/${memberId}`, {replace : true})
    // }
    if(jwtToken) {
      localStorage.setItem("jwtToken", jwtToken)
      navigate("/main", {replace : true})
    }

    // 토큰이 있다면 그 토큰으로 사용자의 정보를 요청
    if(localJwtToken){
      const getUserDatas = async () => {
        const response = await fetch("http://localhost:10000/members/api/profile", {
          method : "POST",
          headers : {
            "Authorization" : `Bearer ${localJwtToken}`
          }
        })

        // 정상 응답
        const datas = await response.json()

        // // 토큰으로 데이터를 못가져오면
        if(!response.ok) {
          // 리덕스를 초기화
          dispatch(setUser({
            id : 0,
            memberEmail : "",
            memberName : "",
            memberNickName : "",
            memberProvider : "",
          }))
          dispatch(setUserStatus(false))

          // 로컬스토리지 토큰 삭제
          localStorage.removeItem("jwtToken")
          localStorage.clear()
          return;
        }


        // 리덕스에 유저정보 파싱
        dispatch(setUser(datas.currentUser))
        dispatch(setUserStatus(true))
      }
      getUserDatas()
    }

  }, [localJwtToken])

  // 리덕스에 유저를 추가하는 코드
  // console.log("layout 리덕스 유저", currentUser)
  // console.log("layout 리덕스 유저 상태", isLogin)

  // 토큰 정보를 확인하는 코드
  // const handleLogout = () => {
  //   localStorage.clear()
  //   dispatch(setUser({
  //     id : 0,
  //     memberEmail : "",
  //     memberName : "",
  //     memberPicture : "",
  //     memberNickName : "",
  //     memberProvider : "",
  //   }))
  //   dispatch(setUserStatus(false))
  //   window.location.href = "http://localhost:10000/logout";
  // }

  

  // if (!isLogin) {
  //   return <Navigate to="/member/login" />;
  // }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
