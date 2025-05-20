import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import MainContainer from "../pages/main/MainContainer";
import LandingPageContainer from "../pages/landingPage/LandingPageContainer";
import LoginLayout from "../pages/layout/LoginLayout";
import ContentsContainer from "../pages/contents/ContentsContainer";
import AchievementContainer from "../pages/contents/acheivement/AchievementContainer";
import MyTreeContainer from "../pages/contents/mytree/MyTreeContainer";
import MyTree from "../pages/contents/mytree/items/MyTree";
import LoginContainer from "../pages/member/login/LoginContainer";
import PointShopContainer from "../pages/contents/pointshop/PointShopContainer";
import MyTreeItemsAll from "../pages/contents/mytree/items/MyTreeItemsAll";
import MyTreeItemBackground from "../pages/contents/mytree/items/MyTreeItemBackGround";
import MyTreeItemSticker from "../pages/contents/mytree/items/MyTreeItemSticker";
import PointShopItemsAll from "../pages/contents/pointshop/items/PointShoptemsAll";
import PointShopItemBackground from "../pages/contents/pointshop/items/PointShopItemBackGround";
import PointShopItemSticker from "../pages/contents/pointshop/items/PointShopItemSticker";
import PointShopMyTree from "../pages/contents/pointshop/items/PointShopMyTree";
import CommunityLayout from "../pages/community/CommunityLayout";
import EventContainer from "../pages/community/event/EventContainer";
import BoardContainer from "../pages/community/board/BoardContainer";
import EventPostContainer from "../pages/community/event/post/EventPostContainer";
import EventPost from "../pages/community/event/post/EventPost";
import BoardPostcontainer from "../pages/community/board/post/BoardPostContainer";
import BoardWriteContainer from "../pages/community/board/write/BoardWriteContainer";
import BoardEditContainer from "../pages/community/board/edit/BoardEditContainer";
import BoardEdit from "../pages/community/board/edit/BoardEdit";
import SurveyContainer from "../pages/survey/SurveyContainer";
import SurveyLayout from "../pages/survey/SurveyLayout/SurveyLayout";
import SurveyIntroContainer from "../pages/survey/intro/SurveyIntroContainer";
import SurveyType from "../pages/survey/type/SurveyType";
import SurveyFood from "../pages/survey/food/SurveyFood";
import SurveyTravel from "../pages/survey/travel/SurveyTravel";
import SurveyFoodInfo from "../pages/survey/food/info/SurveyFoodInfo";
import SurveyFoodPlace from "../pages/survey/food/place/SurveyFoodPlace";
import SurveyFoodShopping from "../pages/survey/food/shopping/SurveyFoodShopping";
import SurveyTravelInfo from "../pages/survey/travel/info/SurveyTravelInfo";
import SurveyTravelPlace from "../pages/survey/travel/place/SurveyTravelPlace";
import SurveyTravelShopping from "../pages/survey/travel/shopping/SurveyTravelShopping";
import MemberLayout from "../pages/member/MemberLayout";
import EmailLogin from "../pages/member/login/EmailLogin";
import SocialLogin from "../pages/member/login/SocialLogin";
import FindId from "../pages/member/find/id/FindId";
import FindIdComplete from "../pages/member/find/id/FindIdComplete";
import NotFound from "../pages/notFound/NotFound";
import FindPasswordContainer from "../pages/member/find/password/FindPasswordContainer";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import Identify from "../pages/member/find/password/Identify";
import Verify from "../pages/member/find/password/Verify";
import Reset from "../pages/member/find/password/Reset";
import Faq from "../pages/faq/Faq";
import MyPageMain from "../pages/myPage/main/MyPageMain";
import MyPageAchievement from "../pages/myPage/achievement/MyPageAchievement";
import MyPagePosts from "../pages/myPage/posts/MyPagePosts";
import MyPageComments from "../pages/myPage/comments/MyPageComments";
import MyPageProfileEdit from "../pages/myPage/profileEdit/MyPageProfileEdit";
import MyPageMemberEdit from "../pages/myPage/memberEdit/MyPageMemberEdit";
import MyPagePointLog from "../pages/myPage/pointLog/MyPagePointLog";
import MyPageSurveyEdit from "../pages/myPage/surveyEdit/MyPageSurveyEdit";
import JoinAgree from "../pages/member/join/JoinAgree";
import JoinContainer from "../pages/member/join/JoinContainer";
import JoinInfo from "../pages/member/join/JoinInfo";
import JoinProfile from "../pages/member/join/JoinProfile";
import CalendarTodo from "../pages/main/calendar/calendarTodo/CalendarTodo";
import CalendarSave from "../pages/main/calendar/calendarSave/CalendarSave";
import ScheduleSave from "../pages/main/calendar/scheduleSave/ScheduleSave";
import ScheduleView from "../pages/main/calendar/scheduleView/ScheduleView";
import PrivacyPolicy from "../pages/privacy/PrivacyPolicy";
import BoardPost from "../pages/community/board/post/BoardPost";
import CalendarContainer from "../pages/main/calendar/CalendarContainer";
import CalendarDayContainer from "../pages/main/calendar/calendarDay/CalendarDayContainer";
import CalendarMonthContainer from "../pages/main/calendar/calendarMonth/CalendarMonthContainer";
import CalendarWeekContainer from "../pages/main/calendar/calendarWeek/CalendarWeekContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPageContainer />, // 랜딩 페이지 http://localhost:3000/
      },
      {
        path: "/main",
        element: <LoginLayout />, // 로그인 확인 /main
        children: [
          {
            path : "",
            element: <MainContainer />,
            children: [
              {
                path : ":memberId/:calendarId",
                element : <CalendarContainer />,
                children : [
                  {
                    path: "",
                    element : <CalendarDayContainer />,
                    children : [
                      {
                        path : "",
                        element : <CalendarTodo />
                      },
                      {
                        path : "schedule-view",
                        element : <ScheduleView />
                      },
                      {
                        path : "schedule-save",
                        element : <ScheduleSave />
                      },
                      {
                        path : "calendar-save",
                        element : <CalendarSave />
                      },
                    ]
                  },
                  {
                    path : "month",
                    element : <CalendarMonthContainer />
                  },
                  {
                    path : "week",
                    element : <CalendarWeekContainer />
                  }
                ]
              },
              {
                path: "contents",
                element: <ContentsContainer />, // 콘텐츠 페이지
                children: [
                  {
                    path: "",
                    element: <AchievementContainer />, // 업적 /main/contents
                  },
                  {
                    path: "mytree",
                    element: <MyTreeContainer />, // 성장나무
                    children: [
                      {
                        path: "all",
                        element: <MyTreeItemsAll />, // 성장나무 - 전체 /main/contents/mytree
                      },
                      {
                        path: "background",
                        element: <MyTreeItemBackground />, // 성장나무 - 배경 /main/contents/mytree/background
                      },
                      {
                        path: "sticker",
                        element: <MyTreeItemSticker />, // 성장나무 - 스티커 /main/contents/mytree/sticker
                      },
                      {
                        path: "tree",
                        element: <MyTree />, // 성장나무 - 나무 /main/contents/mytree/tree
                      },
                    ],
                  },
                  {
                    path: "point-shop",
                    element: <PointShopContainer />, // 포인트샵 페이지
                    children: [
                      {
                        path: "all",
                        element: <PointShopItemsAll />, // 포인트샵 - 전체 /main/contents/point-shop
                      },
                      {
                        path: "background",
                        element: <PointShopItemBackground />, // 포인트샵 - 배경 /main/contents/point-shop/background
                      },
                      {
                        path: "sticker",
                        element: <PointShopItemSticker />, // 포인트샵 - 스티커 /main/contents/point-shop/sticker
                      },
                      {
                        path: "tree",
                        element: <PointShopMyTree />, // 포인트샵 - 나무 /main/contents/point-shop/tree
                      },
                    ],
                  },
                ],
              },
              {
                path: "community",
                element: <CommunityLayout />, // 메뉴 버튼
                children: [
                  {
                    path: "event",
                    element: <EventContainer />,
                  },
                  {
                    path: "board",
                    element: <BoardContainer />,
                  },
                ],
              },
              {
                path: "community/event/post",
                element: <EventPostContainer />,
                children: [
                  {
                    path: ":id",
                    element: <EventPost />,
                  },
                ],
              },
              {
                path: "community/board/post",
                element: <BoardPostcontainer />,
                children: [
                  {
                    path: ":id",
                    element: <BoardPost />,
                  },
                ],
              },
              {
                path: "community/board/write",
                element: <BoardWriteContainer />,
              },
              {
                path: "community/board/edit",
                element: <BoardEditContainer />,
                children: [
                  {
                    path: ":id",
                    element: <BoardEdit />,
                  },
                ],
              },
            ],
          },
          {
            path: "mypage/:id",
            element: <MyPageContainer />, //마이페이지
            children: [
              {
                path: "",
                element: <MyPageMain />,
              },
              {
                path: "achievement",
                element: <MyPageAchievement />,
              },
              {
                path: "posts",
                element: <MyPagePosts />,
              },
              {
                path: "comments",
                element: <MyPageComments />,
              },
              {
                path: "profile-edit",
                element: <MyPageProfileEdit />,
              },
              {
                path: "member-edit",
                element: <MyPageMemberEdit />,
              },
              {
                path: "point-log",
                element: <MyPagePointLog />,
              },
              {
                path: "survey-edit",
                element: <MyPageSurveyEdit />,
              },
            ],
          },
          {
            path: "faq",
            element: <Faq />,
          },
        ],
      },
    ],
  },
  {
    path: "/survey",
    element: <SurveyContainer />, // 설문조사 공통 레이아웃
    children: [
      {
        path: "",
        element: <SurveyLayout />,
        children: [
          {
            path: "",
            element: <SurveyType />,
          },
          {
            path: "food",
            element: <SurveyFood />,
            children: [
              {
                path: "",
                element: <SurveyFoodInfo />,
              },
              {
                path: "place",
                element: <SurveyFoodPlace />,
              },
              {
                path: "shopping",
                element: <SurveyFoodShopping />,
              },
            ],
          },
          {
            path: "travel",
            element: <SurveyTravel />,
            children: [
              {
                path: "",
                element: <SurveyTravelInfo />,
              },
              {
                path: "place",
                element: <SurveyTravelPlace />,
              },
              {
                path: "shopping",
                element: <SurveyTravelShopping />,
              },
            ],
          },
        ],
      },
      {
        path: "intro",
        element: <SurveyIntroContainer />,
      },
    ],
  },
  {
    path: "/member",
    element: <MemberLayout />,
    children: [
      {
        path: "join",
        element: <JoinContainer />,
        children: [
          {
            path: "",
            element: <JoinAgree />,
          },
          {
            path: "info",
            element: <JoinInfo />,
          },
          {
            path: "profile",
            element: <JoinProfile />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginContainer />,
        children: [
          {
            path: "",
            element: <EmailLogin />,
          },
          {
            path: "social",
            element: <SocialLogin />,
          },
        ],
      },
      {
        path: "find-id", // 아이디 찾기
        element: <FindId />,
      },
      {
        path: "find-id-complete",
        element: <FindIdComplete />,
      },
      {
        path: "find-password", // 비밀번호 찾기
        element: <FindPasswordContainer />,
        children: [
          {
            path: "identify",
            element: <Identify />,
          },
          {
            path: "verify",
            element: <Verify />,
          },
          {
            path: "reset",
            element: <Reset />,
          },
        ],
      },
    ],
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
