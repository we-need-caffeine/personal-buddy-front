import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";
import { useJoin } from "./JoinContext";
import JoinContainer from "./JoinContainer";
import JoinAgree from "./JoinAgree";
import JoinInfo from "./JoinInfo";
import JoinProfile from "./JoinProfile";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { joinData, setJoinData } = useJoin();

  const provider = searchParams.get("provider");
  const email = searchParams.get("email");

  const isSocial = !!(provider && email);

  useEffect(() => {
    if (isSocial) {
      // 쿼리스트링 값이 있으면 소셜 경로로 이동
      setJoinData(prev => ({
      ...prev,
      info: {
        ...prev.info,
        memberEmail: email,
        memberProvider: provider,
        isSocial: true,
      },
    }));
      navigate("/member/join/social", { replace: true });
    }
  }, [isSocial, email, provider, navigate]);

  return (
    <JoinContainer>
      {
        {
          "/member/join": <JoinAgree />,
          "/member/join/info": <JoinInfo />,
          "/member/join/profile": <JoinProfile />,
        }[window.location.pathname] || <JoinAgree />
      }
    </JoinContainer>
  );
};

export default SignUp;
