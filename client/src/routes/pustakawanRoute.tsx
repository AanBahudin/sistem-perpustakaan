import { PustakawanLayout } from '@/pages/pustakawan'
import PustakawanLoginPage from '@/pages/pustakawan/auth/PustakawanLoginPage'
import PustakawanBerandaPage from '@/pages/pustakawan/beranda/PustakawanBerandaPage'
import PustakawanBukuDihilangPage from '@/pages/pustakawan/buku/PustakawanBukuDihilangPage'
import PustakawanBukuDikembalikanPage from '@/pages/pustakawan/buku/PustakawanBukuDikembalikanPage'
import PustakawanBukuDiperpanjangPage from '@/pages/pustakawan/buku/PustakawanBukuDiperpanjangPage'
import PustakawanBukuDipinjamPage from '@/pages/pustakawan/buku/PustakawanBukuDipinjamPage'
import PustakawanDetailBuku from '@/pages/pustakawan/buku/PustakawanDetailBuku'
import PustakawanEditBuku from '@/pages/pustakawan/buku/PustakawanEditBuku'
import PustakawanSemuaBukuPage from '@/pages/pustakawan/buku/PustakawanSemuaBukuPage'
import PustakawanTambahBuku from '@/pages/pustakawan/buku/PustakawanTambahBuku'
import PustakawanDetailPeminjaman from '@/pages/pustakawan/pengajuan/PustakawanDetailPeminjaman'
import PustakawanDetailPengembalian from '@/pages/pustakawan/pengajuan/PustakawanDetailPengembalian'
import PustakawanDetailPerpanjanganPage from '@/pages/pustakawan/pengajuan/PustakawanDetailPerpanjangan'
import PustakawanPeminjaman from '@/pages/pustakawan/pengajuan/PustakawanPeminjaman'
import PustakawanPengembalianPage from '@/pages/pustakawan/pengajuan/PustakawanPengembalianPage'
import PustakawanPerpanjangan from '@/pages/pustakawan/pengajuan/PustakawanPerpanjangan'
import PustakawanPengaturanPage from '@/pages/pustakawan/pengaturan/PustakawanPengaturanPage'
import DaftarPenggunaDosen from '@/pages/pustakawan/pengguna/DaftarPenggunaDosen'
import DaftarPenggunaMahasiswa from '@/pages/pustakawan/pengguna/DaftarPenggunaMahasiswa'
import DaftarSemuaPengguna from '@/pages/pustakawan/pengguna/DaftarSemuaPengguna'
import SinglePengguna from '@/pages/pustakawan/pengguna/SinglePengguna'
import PustakawanProfilePage from '@/pages/pustakawan/profil/PustakawanProfilePage'
import PustakawanRiwayatKehilanganPage from '@/pages/pustakawan/Riwayat/PustakawanRiwayatKehilanganPage'
import PustakawanRiwayatPage from '@/pages/pustakawan/Riwayat/PustakawanRiwayatPage'
import PustakawanRiwayatPeminjamanPage from '@/pages/pustakawan/Riwayat/PustakawanRiwayatPeminjamanPage'
import PustakawanRiwayatPengembalianPage from '@/pages/pustakawan/Riwayat/PustakawanRiwayatPengembalianPage'
import PustakawanRiwayatPerpanjanganPage from '@/pages/pustakawan/Riwayat/PustakawanRiwayatPerpanjanganPage'
import { RouteObject } from 'react-router-dom'
import SemuaPengajuan from '@/pages/pustakawan/pengajuan/PustakawanSemuaPengajuan'

const pustakawanRoute : RouteObject[] = [
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
                        element: <SemuaPengajuan />,
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
    }
]

export default pustakawanRoute