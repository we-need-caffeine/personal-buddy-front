import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Banner from "../pages/layout/banner/Banner";
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
import EventMainContainer from "../pages/event/main/EventMainContainer";
import EventContainer from "../pages/event/EventContainer";
import EventPostContainer from "../pages/event/post/EventPostContainer";
import SurveyLayout from "../pages/survey/SurveyLayout/SurveyLayout";
import SurveyMainContainer from "../pages/survey/SurveyMainContainer";
import SurveyInfoContainer from "../pages/survey/info/SurveyInfoContainer";
import SurveyPlaceContainer from "../pages/survey/place/SurveyPlaceContainer";
import SurveyShoppingContainer from "../pages/survey/shopping/SurveyShoppingContainer";
import SurveyDetailContainer from "../pages/survey/detail/SurveyDetailContainer";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                path : "/",
                element : <LandingPageContainer /> // 랜딩 페이지 http://localhost:3000/
            },          
            {
                path : "/main",
                element : <LoginLayout />, // 로그인 확인 /main
                children : [
                    {
                        element : <Banner />,
                        children : [
                            {
                                path : "",
                                element : <MainContainer /> // 메인 페이지 /main
                            },
                            {
                                path : "contents",
                                element : <ContentsContainer />, // 콘텐츠 페이지 
                                children : [
                                    {
                                        path : "",
                                        element : <AchievementContainer /> // 업적 /main/contents
                                    },
                                    {
                                        path : "mytree",
                                        element : <MyTreeContainer />, // 성장나무 
                                        children : [
                                            {
                                                path : "all",
                                                element : <MyTreeItemsAll /> // 성장나무 - 전체 /main/contents/mytree
                                            },
                                            {
                                                path : "background",
                                                element : <MyTreeItemBackground /> // 성장나무 - 배경 /main/contents/mytree/background
                                            },
                                            {
                                                path : "sticker",
                                                element : <MyTreeItemSticker /> // 성장나무 - 스티커 /main/contents/mytree/sticker

                                            },
                                            {
                                                path : "tree",
                                                element : <MyTree /> // 성장나무 - 나무 /main/contents/mytree/tree
                                            }
                                        ]
                                    },
                                    {
                                        path : "point-shop",
                                        element : <PointShopContainer />, // 포인트샵 페이지
                                        children : [
                                            {
                                                path : "all",
                                                element : <PointShopItemsAll /> // 포인트샵 - 전체 /main/contents/point-shop
                                            },
                                            {
                                                path : "background",
                                                element : <PointShopItemBackground /> // 포인트샵 - 배경 /main/contents/point-shop/background
                                            },
                                            {
                                                path : "sticker",
                                                element : <PointShopItemSticker /> // 포인트샵 - 스티커 /main/contents/point-shop/sticker
                                            },
                                            {
                                                path : "tree",
                                                element : <PointShopMyTree /> // 포인트샵 - 나무 /main/contents/point-shop/tree
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                path : "event",
                                element : <EventContainer />, // 이벤트 페이지 
                                children : [
                                    {
                                        path : "",
                                        element : <EventMainContainer /> // 이벤트 메인 페이지 /main/event
                                    },
                                    {
                                        path :"post",
                                        element : <EventPostContainer /> // 이벤트 상세 페이지 /main/event/post
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

        ]
    },

    {
        path: "/survey",
        element: <SurveyLayout />, // 설문조사 공통 레이아웃
        children: [
          {
            path: "main",
            element: <SurveyMainContainer /> // 설문 시작 메인페이지 /survey/main
          },
          {
            path: ":category", // 동적 라우팅 (food, fashion ...) 
            element: <SurveyDetailContainer />, // 공통 컨테이너 
            children: [
              {
                path: "info",
                element: <SurveyInfoContainer /> // /survey/food/info
              },
              {
                path: "place",
                element: <SurveyPlaceContainer /> // /survey/fashion/place
              },
              {
                path: "shopping",
                element: <SurveyShoppingContainer /> // /survey/sports/shopping
              }
            ]
          }
        ]
      },

    
    {
        path: "/member/login", // 로그인 페이지 
        element: <LoginContainer />
    },
]);


export default router;