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
import PustakawanLoginPage from "./pages/pustakawan/auth/PustakawanLoginPage";
import PustakawanBerandaPage from "./pages/pustakawan/beranda/PustakawanBerandaPage";
import PustakawanProfilePage from "./pages/pustakawan/profil/PustakawanProfilePage";
import DaftarSemuaPengguna from "./pages/pustakawan/pengguna/DaftarSemuaPengguna";
import PustakawanPengajuanLayout from "./pages/pustakawan/pengajuan/PustakawanPengajuanLayout";
import PustakawanPeminjaman from "./pages/pustakawan/pengajuan/PustakawanPeminjaman";
import PustakawanPerpanjangan from "./pages/pustakawan/pengajuan/PustakawanPerpanjangan";
import PustakawanRiwayatPage from "./pages/pustakawan/Riwayat/PustakawanRiwayatPage";
import PustakawanPengembalianPage from "./pages/pustakawan/pengajuan/PustakawanPengembalianPage";
import DaftarPenggunaDosen from "./pages/pustakawan/pengguna/DaftarPenggunaDosen";
import DaftarPenggunaMahasiswa from "./pages/pustakawan/pengguna/DaftarPenggunaMahasiswa";
import PustakawanSemuaBukuPage from "./pages/pustakawan/buku/PustakawanSemuaBukuPage";
import PustakawanBukuDipinjamPage from "./pages/pustakawan/buku/PustakawanBukuDipinjamPage";
import PustakawanBukuDikembalikanPage from "./pages/pustakawan/buku/PustakawanBukuDikembalikanPage";
import PustakawanBukuDiperpanjangPage from "./pages/pustakawan/buku/PustakawanBukuDiperpanjangPage";
import PustakawanBukuDihilangPage from "./pages/pustakawan/buku/PustakawanBukuDihilangPage";
import PustakawanRiwayatPeminjamanPage from "./pages/pustakawan/Riwayat/PustakawanRiwayatPeminjamanPage";
import PustakawanRiwayatPerpanjanganPage from "./pages/pustakawan/Riwayat/PustakawanRiwayatPerpanjanganPage";
import PustakawanRiwayatPengembalianPage from "./pages/pustakawan/Riwayat/PustakawanRiwayatPengembalianPage";
import PustakawanRiwayatKehilanganPage from "./pages/pustakawan/Riwayat/PustakawanRiwayatKehilanganPage";

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
        path: '/pustakawan/login',
        element: <PustakawanLoginPage />
    },
    {
        path: '/pustakawan',
        element: <PustakawanLayout />,
        children: [
            {
                index: true,
                element: <PustakawanBerandaPage />
            },
            {
                path: 'profil',
                element: <PustakawanProfilePage />
            },
            {
                path: 'pengguna',
                children: [
                    {
                        index: true,
                        element: <DaftarSemuaPengguna />,
                    },
                    {
                        path: 'dosen',
                        element: <DaftarPenggunaDosen />
                    },
                    {
                        path: 'mahasiswa',
                        element: <DaftarPenggunaMahasiswa />
                    }
                ]
            },
            {
                path: 'pengajuan',
                children: [
                    {
                        index: true,
                        element: <PustakawanPengajuanLayout />,
                    },
                    {
                        path: 'peminjaman',
                        element: <PustakawanPeminjaman />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PustakawanPerpanjangan />
                    },
                    {
                        path: 'pengembalian',
                        element: <PustakawanPengembalianPage />
                    }
                ]
            },
            {
                path: 'buku',
                children: [
                    {
                        index: true,
                        element: <PustakawanSemuaBukuPage />
                    },
                    {
                        path: 'peminjaman',
                        element: <PustakawanBukuDipinjamPage />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PustakawanBukuDiperpanjangPage />
                    },
                    {
                        path: 'pengembalian',
                        element: <PustakawanBukuDikembalikanPage />
                    },
                    {
                        path: 'hilang',
                        element: <PustakawanBukuDihilangPage />
                    }
                ]
            },
            {
                path: 'riwayat',
                children: [
                    {
                        index: true,
                        element: <PustakawanRiwayatPage />,
                    },
                    {
                        path: 'peminjaman',
                        element: <PustakawanRiwayatPeminjamanPage />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PustakawanRiwayatPerpanjanganPage />
                    },
                    {
                        path: 'pengembalian',
                        element: <PustakawanRiwayatPengembalianPage />
                    },
                    {
                        path: 'hilang',
                        element: <PustakawanRiwayatKehilanganPage />
                    }
                ]
            },
            {
                path: 'notifikasi',
                
            },
            {
                path: 'pengaturan'
            },
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