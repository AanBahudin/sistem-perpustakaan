import { RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, StatusPinjaman, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";
import Verify from "./pages/Verify";
import {loader as VerifyLoader} from '@/pages/Verify'
import {loader as LoginLoader} from '@/pages/landing/Login'
import {loader as RegisterLoader} from '@/pages/landing/Register'

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
                element: <RegisterPage />,
                loader: RegisterLoader
            },
            {
                path: 'login',
                element: <LoginPage />,
                loader: LoginLoader
            },
            
        ]
    },
    {
        path:'status/account',
        element: <Verify />,
        loader: VerifyLoader
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