import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../pages/main/MainContainer";
import LandingPage from "../pages/landingPage/LandingPage";
import JoinAgreeContainer from "../pages/member/join/agree/JoinAgreeContainer";
import JoinInfoContainer from "../pages/member/join/info/JoinInfoContainer";
import JoinProfileContainer from "../pages/member/join/profile/JoinProfileContainer";
import LoginContainer from "../pages/member/login/LoginContainer";
import SurveyMainContainer from "../pages/survey/SurveyMainContainer";
import AchievementContainer from "../pages/contents/acheivement/AchievementContainer";
import PointShopContainer from "../pages/contents/pointshop/PointShopContainer";
import TreeCustomizingContainer from "../pages/contents/tree/TreeCustomizingContainer";
import EventMainContainer from "../pages/event/main/EventMainContainer";
import EventPostContainer from "../pages/event/post/EventPostContainer";
import BoardMainContainer from "../pages/board/main/BoardMainContainer";
import BoardEditContainer from "../pages/board/edit/BoardEditContainer";
import BoardPostcontainer from "../pages/board/post/BoardPostcontainer";
import BoardWriteContainer from "../pages/board/write/BoardWriteContainer";
import FaqContainer from "../pages/faq/FaqContainer";
import LayoutWithBanner from "../pages/layout/LayoutWithBanner";
import LayoutWithoutBanner from "../pages/layout/LayoutWithoutBanner";
import MyPageAchievementContainer from "../pages/myPage/achievement/MyPageAchievementContainer";
import MyPageMainContainer from "../pages/myPage/main/MyPageMainContainer";
import MyPageCommentsContainer from "../pages/myPage/comments/MyPageCommentsContainer";
import MyPageProfileEditContainer from "../pages/myPage/profileEdit/MyPageProfileEditContainer";
import MyPageSurveyEditContainer from "../pages/myPage/surveyEdit/MyPageSurveyEditContainer";
import MyPagePostsContainer from "../pages/myPage/posts/MyPagePostsContainer";


const router = createBrowserRouter([
    
    {
        path : "",
        element : <LayoutWithBanner />, // 헤더, 푸터, 배너 존재라는 레이아웃
        children : [          
            {
                path : "/main",
                element : <MainContainer /> // 메인 페이지
            },
            {
                path : "/contents/achievement",
                element : <AchievementContainer /> // 컨텐츠 - 업적 페이지
            },
            {
                path : "/contents/point-shop",
                element : <PointShopContainer /> // 컨텐츠 - 포인트 샵 페이지
            },
            {
                path : "/contents/mytree",
                element : <TreeCustomizingContainer /> // 컨텐츠 - 성장나무 페이지
            },
            {
                path : "/event/main",
                element : <EventMainContainer /> // 이벤트 - 메인 페이지
            },
            {
                path : "/event/post/:id", 
                element : <EventPostContainer /> // 이벤트 - 상세 페이지
            },
            {
                path : "/board/main",
                element : <BoardMainContainer /> // 게시판 - 메인 페이지
            },
            {
                path : "board/write",
                element : <BoardWriteContainer /> // 게시판 - 글쓰기 페이지
            },
            {
                path : "/board/edit/:id", 
                element : <BoardEditContainer /> // 게시판 - 수정 페이지
            },
            {
                path : "/board/post/:id",
                element : <BoardPostcontainer /> // 게시판 - 상세 페이지
            },
                  
        ]
    },

    {
        path : "/",
        element : <LayoutWithoutBanner />, // 헤더,푸터만 존재하는 레이아웃
        children : [
            {
                index : true, 
                element: <LandingPage /> // 로그인 전 페이지
        
            },
            {
                path : "/mypage/main",
                element : <MyPageMainContainer />// 마이페이지 - 메인

            },
            {
                path : "/mypage/achievement",
                element : <MyPageAchievementContainer /> // 마이페이지 - 업적
            },
            {
                path : "mypage/profile-edit",
                element : <MyPageProfileEditContainer /> // 마이페이지 - 개인 정보 수정
            },
            {
                
                // 마이페이지 - 포인트
            },
            {
                path : "/mypage/posts",
                element : <MyPagePostsContainer /> // 마이페이지ㅣ - 내가 쓴 글

            },
            {
                path : "/mypage/comments",
                element : <MyPageCommentsContainer /> // 마이페이지 - 내가 쓴 댓글
            },
            {
                // 마이페이지 - 회원 정보 수정
            },
            {
                // 마이페이지 - 개인 정보 수정

            },
            {
                path : "/mypage/survey-edit",
                element : <MyPageSurveyEditContainer /> // 마이페이지 - 설문 조사 수정
            }         
        ]
    }, 
    

    {
        path : "/member/join/agree",
        element : <JoinAgreeContainer /> // 회원 가입 - 개인정보 수집 동의 페이지

    },
    {
        path : "member/join/info",
        element : <JoinInfoContainer /> // 회원 가입 - 회원 정보 입력 페이지
    },
    {
        path : "member/join/profile",
        element : <JoinProfileContainer /> // 회원 가입 - 회원 프로필 입력 페이지
    },
    {
        path : "member/login",
        element : <LoginContainer /> // 로그인 페이지
    },
    {
        path : "survey",
        element : <SurveyMainContainer /> // 설문조사 페이지
    },
    {       
        path : "/faq",
        element : <FaqContainer /> // 고객센터 페이지
    }
    
]);


export default router;