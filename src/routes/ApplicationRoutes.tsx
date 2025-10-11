import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullScreenSpinner from "../components/FullScreenSpinner/FullScreenSpinner";

const ListPage = lazy(() => import("../pages/list-page/ListPage"))
const ViewPage = lazy(() => import("../pages/view-page/ViewPage"))


const PUBLIC_ROUTES = [
    {
        path: "/",
        element: <ListPage />
    },
    {
        path: "/:flight_number",
        element: <ViewPage />
    }
];

const ApplicationRoutes: React.FC = () => {
    return (
        <Suspense fallback={<FullScreenSpinner />}>
            <BrowserRouter>
                <Routes>
                    {PUBLIC_ROUTES.map((route, index) => (<Route key={index} path={route.path} element={route.element} />))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default ApplicationRoutes;
