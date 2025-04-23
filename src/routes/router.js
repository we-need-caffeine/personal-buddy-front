import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Banner from "../pages/layout/banner/Banner";
import MainContainer from "../pages/main/MainContainer";
import LandingPageContainer from "../pages/landingPage/LandingPageContainer";
import LoginLayout from "../pages/layout/LoginLayout";
import ContentsContainer from "../pages/contents/ContentsContainer";
import AchievementContainer from "../pages/contents/acheivement/AchievementContainer";
import MyTreeContainer from "../pages/contents/mytree/MyTreeContainer";
import TestAll from "../pages/contents/mytree/test/TestAll";
import TestBackGround from "../pages/contents/mytree/test/TestBackGround";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                path : "/",
                element : <LandingPageContainer />
            },
            {
                path : "/main",
                element : <LoginLayout />,
                children : [
                    {
                        element : <Banner />,
                        children : [
                            {
                                path : "",
                                element : <MainContainer />
                            },
                            {
                                path : "contents",
                                element : <ContentsContainer />,
                                children : [
                                    {
                                        path : "",
                                        element : <AchievementContainer />
                                    },
                                    {
                                        path : "mytree",
                                        element : <MyTreeContainer />,
                                        children : [
                                            {
                                                path : "",
                                                element : <TestAll />
                                            },
                                            {
                                                path : "all",
                                                element : <TestAll />
                                            },
                                            {
                                                path : "background",
                                                element : <TestBackGround />
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    },
]);


export default router;