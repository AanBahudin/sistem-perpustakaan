import { RouteObject } from "react-router-dom";
import {
    LandingLayout,
    HomePage,
    LoginPage,
    RegisterPage
} from '@/pages/landing'
import LandingKatalog from "@/pages/landing/LandingKatalog";
import DetailBukuKatalog from "@/pages/landing/DetailBukuKatalog";
import Verify from "@/pages/Verify";

const landingRoute: RouteObject[] = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {index: true, element: <HomePage />},
            { path: "register", element: <RegisterPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "katalog", element: <LandingKatalog /> },
            { path: "katalog/:id", element: <DetailBukuKatalog /> },
        ]
    },
    {
        path: "status/account",
        element: <Verify />,
    },
]

export default landingRoute