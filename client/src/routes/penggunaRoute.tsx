import { DetailBuku, KatalogPengguna, PenggunaLayout, ProfilPengguna } from "@/pages/pengguna";
import KatalogPenggunaPage from "@/pages/pengguna/Buku/KatalogPenggunaPage";
import DataPenggunaLayout from "@/pages/pengguna/DataPenggunaLayout";
import AllBook from "@/pages/pengguna/discovery/AllBook";
import CategoryPage from "@/pages/pengguna/discovery/CategoryPage";
import DiscoveryPage from "@/pages/pengguna/discovery/DiscoveryPage";
import KonfirmasiPeminjaman from "@/pages/pengguna/Peminjaman/KonfirmasiPeminjaman";
import PeminjamanDetailPage from "@/pages/pengguna/Peminjaman/PeminjamanDetailPage";
import PeminjamanPage from "@/pages/pengguna/Peminjaman/PeminjamanPage";
import PengembalianPage from "@/pages/pengguna/Pengembalian/PengembalianPage";
import DetailPerpanjanganPage from "@/pages/pengguna/Perpanjangan/DetailPerpanjanganPage";
import PerpanjanganPage from "@/pages/pengguna/Perpanjangan/PerpanjanganPage";
import CredentialsProfilePage from "@/pages/pengguna/Profil/CredentialsProfilePage";
import GeneralProfilePage from "@/pages/pengguna/Profil/GeneralProfilePage";
import StatusProfilePage from "@/pages/pengguna/Profil/StatusProfilePage";
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
                element: <KonfirmasiPeminjaman />
            },
            {
                path: 'peminjaman/:id/:idBuku',
                element: <PeminjamanDetailPage />
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