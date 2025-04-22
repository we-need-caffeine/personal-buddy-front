import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../pages/main/MainContainer";
import Layout from "../pages/layout/Layout";
import LandingPage from "../pages/landingPage/LandingPage";
import AchievementContainer from "../pages/contents/AchievementContainer";
import TreeCustomizingContainer from "../pages/contents/TreeCustomizingContainer";
import PointShopContainer from "../pages/contents/PointShopContainer";

const router = createBrowserRouter([
    
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                index : true, 
                element: <LandingPage /> // 로그인 전 페이지
        
            },
            {
                path : "/main",
                element : <MainContainer /> // 메인 페이지
            },
            {
                path : "/contents-achievement",
                element : <AchievementContainer /> // 컨텐츠-업적 페이지
            },
            {
                path : "/contents-tree",
                element : <TreeCustomizingContainer /> // 컨텐츠-성장나무 페이지
            },
            {
                path : "/contents-pointshop",
                element : <PointShopContainer /> // 컨텐츠-포인트샵 페이지
            }
        ]
    }
])

export default router;