import { Navigate, RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";
import Verify from "./pages/Verify";
import {loader as VerifyLoader} from '@/pages/Verify'
import {loader as LoginLoader} from '@/pages/landing/Login'
import {loader as RegisterLoader} from '@/pages/landing/Register'
import KatalogPenggunaPage, { katalogPageLoader } from "./pages/pengguna/Buku/KatalogPenggunaPage";
import GeneralProfilePage from "./pages/pengguna/Profil/GeneralProfilePage";
import CredentialsProfilePage from "./pages/pengguna/Profil/CredentialsProfilePage";
import StatusProfilePage from "./pages/pengguna/Profil/StatusProfilePage";
import { profileLoader } from "./pages/pengguna/ProfilPengguna";
import PeminjamanPage from "./pages/pengguna/Peminjaman/PeminjamanPage";
import DataPenggunaLayout from "./pages/pengguna/DataPenggunaLayout";
import PengembalianPage from "./pages/pengguna/Pengembalian/PengembalianPage";
import PerpanjanganPage from "./pages/pengguna/Perpanjangan/PerpanjanganPage";
import PeminjamanDetailPage from "./pages/pengguna/Peminjaman/PeminjamanDetailPage";
import SukaPage from "./pages/pengguna/Suka/SukaPage";
import SimpanPage from "./pages/pengguna/Simpan/SimpanPage";
import DetailPengembalian from "./pages/pengguna/Pengembalian/DetailPengembalian";
import DetailPerpanjanganPage from "./pages/pengguna/Perpanjangan/DetailPerpanjanganPage";
import KonfirmasiPeminjaman from "./pages/pengguna/Peminjaman/KonfirmasiPeminjaman";
import ConfirmPerpanjangan from "./pages/pengguna/Perpanjangan/ConfirmPerpanjangan";
import DiscoveryPage from "./pages/pengguna/Discovery/DiscoveryPage";
import SearchPage from "./pages/pengguna/Search/SearchPage";
import CategoryPage from "./pages/pengguna/Discovery/CategoryPage";
import AllBook from "./pages/pengguna/Discovery/AllBook";
import ConfirmPengembalian from "./pages/pengguna/Pengembalian/ConfirmPengembalianPage";

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
        path: '/my',
        element: <PenggunaLayout />,
        children: [
            {
                id: 'data-layout',
                index: true,
                element: <KatalogPengguna />,
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
                path: 'data',
                element: <DataPenggunaLayout />,
                children: [
                    {
                        id: 'peminjaman-data',
                        path: 'peminjaman',
                        element: <PeminjamanPage />
                    },
                    {
                        path: 'pengembalian',
                        element: <PengembalianPage />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PerpanjanganPage />
                    }
                ]
            },
            {
                path: 'confirm/peminjaman/:id',
                element: <KonfirmasiPeminjaman />
            },
            {
                path: 'peminjaman/:id/:idBuku',
                element: <PeminjamanDetailPage />
            },
            {
                path: 'pengembalian/:id/:idBuku',
                element: <DetailPengembalian />
            },
            {
                path: 'confirm/perpanjangan/:id',
                element: <ConfirmPerpanjangan />
            },
            {
                path: 'perpanjangan/:id/:idBuku',
                element: <DetailPerpanjanganPage />
            },
            {
                id: 'disukai-data',
                path: 'disukai',
                element: <SukaPage />,
            },
            {
                id: 'buku-data',
                path: 'buku',
                element: <KatalogPenggunaPage />,
                loader: katalogPageLoader
            },
            {
                path: 'buku/:id',
                element: <DetailBuku />,
            },
            {
                path: 'tersimpan',
                element: <SimpanPage />,
            },
            {
                path: 'discovery',
                element: <DiscoveryPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='/my/buku' replace />
                    },
                    {
                        path: 'category',
                        element: <CategoryPage />
                    },
                    {
                        path: 'search',
                        element: <SearchPage />
                    },
                    {
                        path: 'all',
                        element: <AllBook />
                    },
                    {
                        path: '*',
                        element: <Navigate to="/my/buku" replace />
                    }
                ]

            },
            {
                path: 'search/:title',
                element: <SearchPage />
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