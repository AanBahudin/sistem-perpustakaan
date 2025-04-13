import React from "react";
import { RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, StatusPinjaman, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";

const router : RouteObject[] = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    },
    {
        path: '/user',
        element: <PenggunaLayout />,
        children: [
            {
                index: true,
                element: <KatalogPengguna />
            },
            {
                path: 'profil',
                element: <ProfilPengguna />
            },
            {
                path: 'status',
                element: <StatusPinjaman />
            },
            {
                path: 'buku/:id',
                element: <DetailBuku />
            }
        ]
    },
    {
        path: '/pustakawan',
        children: [
            {
                index: true,
                element: <PustakawanLayout />
            }
        ]
    },
    {
        path: '/prodi',
        children: [
            {
                index: true,
                element: <ProdiLayout />
            }
        ]
    }
]

export default router