import React from "react";
import { RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/landing";
import HomePage from "../pages/landing/HomePage";

const landingRoute : RouteObject = {
    path: '/',
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: 'login',
            element: React.createElement(LoginPage)
        }
    ]
}

export default landingRoute