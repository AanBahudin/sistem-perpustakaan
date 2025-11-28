import { DetailBuku, KatalogPengguna, PenggunaLayout, ProfilPengguna } from "@/pages/pengguna";
import {DetailPeminjamanPage, KonfirmasiPeminjamanPage, PeminjamanPage } from '@/pages/pengguna/Peminjaman'
import { GeneralProfilePage, CredentiolProfilePage, StatusProfilePage } from "@/pages/pengguna/Profil";
import KatalogPenggunaPage from "@/components/pengguna/KonfirmasiPeminjaman/KatalogPenggunaPage";
import DataPenggunaLayout from "@/pages/pengguna/DataPenggunaLayout";
import AllBook from "@/pages/pengguna/discovery/AllBook";
import CategoryPage from "@/pages/pengguna/discovery/CategoryPage";
import DiscoveryPage from "@/pages/pengguna/discovery/DiscoveryPage";
import DetailPengembalianPage from "@/pages/pengguna/Pengembalian/DetailPengembalianPage";
import PengembalianPage from "@/pages/pengguna/Pengembalian/PengembalianPage";
import ConfirmPerpanjangan from "@/pages/pengguna/Perpanjangan/ConfirmPerpanjangan";
import DetailPerpanjanganPage from "@/pages/pengguna/Perpanjangan/DetailPerpanjanganPage";
import PerpanjanganPage from "@/pages/pengguna/Perpanjangan/PerpanjanganPage";
import SearchPage from "@/pages/pengguna/Search/SearchPage";
import SimpanPage from "@/pages/pengguna/Simpan/SimpanPage";
import SukaPage from "@/pages/pengguna/Suka/SukaPage";
import { Navigate, RouteObject } from "react-router-dom";

const penggunaRoute: RouteObject[] = [
    {
        path: '/my',
        element: <PenggunaLayout />,
        children: [
            {
                index: true,
                element: <KatalogPengguna />
            },
            {
                path: 'profil',
                element: <ProfilPengguna />,
                children: [
                    {
                        index: true,
                        element: <GeneralProfilePage />
                    },
                    {
                        path: 'credentials',
                        element: <CredentiolProfilePage />
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
                        path: 'peminjaman',
                        element: <PeminjamanPage />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PerpanjanganPage />
                    },
                    {
                        path: 'pengembalian',
                        element: <PengembalianPage />
                    }
                ]
            },
            {
                path: 'confirm/peminjaman/:id',
                element: <KonfirmasiPeminjamanPage />
            },
             {
                path: 'confirm/perpanjangan/:id',
                element: <ConfirmPerpanjangan />
            },
            {
                path: 'peminjaman/:id',
                element: <DetailPeminjamanPage />
            },
            {
                path: 'perpanjangan/:id',
                element: <DetailPerpanjanganPage />
            },
            {
                path: 'pengembalian/:id',
                element: <DetailPengembalianPage />
            },
            {
                id: 'disukai-data',
                path: 'disukai',
                element: <SukaPage />,
            },
            {
                id: 'buku-data',
                path: 'buku',
                element: <KatalogPenggunaPage />
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
    }
]

export default penggunaRoute