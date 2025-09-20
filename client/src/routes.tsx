import { Navigate, RouteObject } from "react-router-dom";
import { HomePage, LandingLayout, LoginPage, RegisterPage } from "./pages/landing";
import { PenggunaLayout, ProfilPengguna, KatalogPengguna, DetailBuku } from "./pages/pengguna";
import { ProdiLayout } from "./pages/prodi";
import { PustakawanLayout } from "./pages/pustakawan";
import Verify from "./pages/Verify";
import KatalogPenggunaPage, { katalogPageLoader } from "./pages/pengguna/Buku/KatalogPenggunaPage";
import GeneralProfilePage from "./pages/pengguna/Profil/GeneralProfilePage";
import CredentialsProfilePage from "./pages/pengguna/Profil/CredentialsProfilePage";
import StatusProfilePage from "./pages/pengguna/Profil/StatusProfilePage";
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
import PustakawanPengajuanLayout from "./pages/pustakawan/pengajuan/PustakawanSemuaPengajuan";
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
import SinglePengguna from "./pages/pustakawan/pengguna/SinglePengguna";
import PustakawanDetailPeminjaman from "./pages/pustakawan/pengajuan/PustakawanDetailPeminjaman";
import PustakawanDetailPerpanjanganPage from "./pages/pustakawan/pengajuan/PustakawanDetailPerpanjangan";
import PustakawanDetailPengembalian from "./pages/pustakawan/pengajuan/PustakawanDetailPengembalian";
import PustakawanDetailBuku from "./pages/pustakawan/buku/PustakawanDetailBuku";
import PustakawanTambahBuku from "./pages/pustakawan/buku/PustakawanTambahBuku";
import PustakawanEditBuku from "./pages/pustakawan/buku/PustakawanEditBuku";
import PustakawanPengaturanPage from "./pages/pustakawan/pengaturan/PustakawanPengaturanPage";
import ProdiLoginPage from "./pages/prodi/auth/ProdiLoginPage";
import ProdiSemuaPenggunaPage from "./pages/prodi/pengguna/ProdiSemuaPenggunaPage";
import ProdiPenggunaMahasiswaPage from "./pages/prodi/pengguna/ProdiPenggunaMahasiswaPage";
import ProdiPenggunaDosenPage from "./pages/prodi/pengguna/ProdiPenggunaDosenPage";
import ProdiPengajuanPenggunaPage from "./pages/prodi/pengguna/ProdiPengajuanPenggunaPage";
import ProdiTambahPenggunaPage from "./pages/prodi/pengguna/ProdiTambahPenggunaPage";
import ProdiBerandaPage from "./pages/beranda/ProdiBerandaPage";
import ProdiBlockedPenggunPage from "./pages/prodi/pengguna/ProdiBlockedPenggunPage";
import DetailPengguna from "./pages/prodi/pengguna/DetailPengguna";
import ProdiSemuaBukuPage from "./pages/prodi/buku/ProdiSemuaBukuPage";
import ProdiSemuaBukuDipinjam from "./pages/prodi/buku/ProdiSemuaBukuDipinjam";
import ProdiSemuaBukuDiperpanjang from "./pages/prodi/buku/ProdiSemuaBukuDiperpanjang";
import ProdiSemuaBukuHilangPage from "./pages/prodi/buku/ProdiSemuaBukuHilangPage";
import ProdiSemuaBukuDikembalikan from "./pages/prodi/buku/ProdiSemuaBukuDikembalikan";
import ProdiDetailBuku from "./pages/prodi/buku/ProdiDetailBuku";
import SemuaPustakawan from "./pages/prodi/pustakawan/SemuaPustakawan";
import DetailPustakawan from "./pages/prodi/pustakawan/DetailPustakawan";

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
            },
            
        ]
    },
    {
        path:'status/account',
        element: <Verify />
    },
    {
        path: '/my',
        element: <PenggunaLayout />,
        children: [
            {
                index: true,
                element: <KatalogPengguna />,
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
                        path: 'detail/:id', 
                        element: <SinglePengguna />
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
                        path: 'peminjaman/:idPeminjaman',
                        element: <PustakawanDetailPeminjaman />
                    },
                    {
                        path: 'perpanjangan',
                        element: <PustakawanPerpanjangan />
                    },
                    {
                        path: 'perpanjangan/:idPerpanjangan',
                        element: <PustakawanDetailPerpanjanganPage />
                    },
                    {
                        path: 'pengembalian',
                        element: <PustakawanPengembalianPage />
                    },
                    {
                        path: 'pengembalian/:idPengembalian',
                        element: <PustakawanDetailPengembalian />
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
                        path: 'detail/:idBuku',
                        element: <PustakawanDetailBuku />
                    },
                    {
                        path: 'buat',
                        element: <PustakawanTambahBuku />
                    },
                    {
                        path: 'edit/:idBuku',
                        element: <PustakawanEditBuku />
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
                path: 'pengaturan',
                element: <PustakawanPengaturanPage />
            },
        ]
    },
    {
        path: '/prodi/login',
        element: <ProdiLoginPage />
    },
    {
        path: '/prodi',
        element: <ProdiLayout />,
        children: [
            {
                index: true,
                element: <ProdiBerandaPage />
            },
            {
                path: 'pengguna',
                children: [
                    {
                        index: true,
                        element: <ProdiSemuaPenggunaPage />
                    },
                    {
                        path: 'detail/:id',
                        element: <DetailPengguna />
                    },
                    {
                        path: 'mahasiswa',
                        element: <ProdiPenggunaMahasiswaPage />
                    },
                    {
                        path: 'dosen',
                        element: <ProdiPenggunaDosenPage />
                    },
                    {
                        path: 'pemintaan',
                        element: <ProdiPengajuanPenggunaPage />
                    },
                    {
                        path: 'tambah',
                        element: <ProdiTambahPenggunaPage />
                    },
                    {
                        path: 'permintaan',
                        element: <ProdiPengajuanPenggunaPage />
                    },
                    {
                        path: 'blokir',
                        element: <ProdiBlockedPenggunPage />
                    }
                ]
            },
            {
                path: 'buku',
                children: [
                    {
                        index: true,
                        element: <ProdiSemuaBukuPage />
                    },
                    {
                        path: 'detail/:id',
                        element: <ProdiDetailBuku />
                    },
                    {
                        path: 'dipinjam',
                        element: <ProdiSemuaBukuDipinjam />
                    },
                    {
                        path: 'diperpanjang',
                        element: <ProdiSemuaBukuDiperpanjang />
                    },
                    {
                        path: 'dikembalikan',
                        element: <ProdiSemuaBukuDikembalikan />
                    },
                    {
                        path: 'hilang',
                        element: <ProdiSemuaBukuHilangPage />
                    }
                ]
            },
            {
                path: 'pustakawan',
                element: <SemuaPustakawan />
            },
            {
                path: 'pustakawan/:id',
                element: <DetailPustakawan />
            }
        ]
    }
]

export default router