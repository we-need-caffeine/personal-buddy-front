import { createBrowserRouter } from "react-router-dom";
import MainContainer from "../pages/main/MainContainer";
import Layout from "../pages/layout/Layout";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children : [
            {
                index : true,
                element : <MainContainer />
            }
        ]
    }
])

export default router;