import { RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, StatusPinjaman, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";
import Verify from "./pages/Verify";
import {loader as VerifyLoader} from '@/pages/Verify'
import {loader as LoginLoader} from '@/pages/landing/Login'
import {loader as RegisterLoader} from '@/pages/landing/Register'
import KatalogPenggunaPage from "./pages/pengguna/KatalogPenggunaPage";
import GeneralProfilePage from "./pages/pengguna/GeneralProfilePage";
import CredentialsProfilePage from "./pages/pengguna/CredentialsProfilePage";
import StatusProfilePage from "./pages/pengguna/StatusProfilePage";
import { profileLoader } from "./pages/pengguna/ProfilPengguna";
import PeminjamanPage from "./pages/pengguna/PeminjamanPage";

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
                id: 'user-profil',
                path: 'profil',
                element: <ProfilPengguna />,
                loader: profileLoader,
                children: [
                    {
                        index: true,
                        element: <GeneralProfilePage />
                    },
                    {
                        path: 'credentials',
                        element: <CredentialsProfilePage />
                    },
                    {
                        path: 'status',
                        element: <StatusProfilePage />
                    }
                ]
            },
            {
                path: 'peminjaman',
                element: <PeminjamanPage />
            },
            {
                path: 'status',
                element: <StatusPinjaman />
            },
            {
                path: 'buku',
                element: <KatalogPenggunaPage />
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