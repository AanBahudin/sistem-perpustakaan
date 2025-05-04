import { RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, StatusPinjaman, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";
import { loader } from "./pages/landing/Register";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {staleTime: 1000 * 60 * 5}
    }
})

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
                loader: loader(queryClient)
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