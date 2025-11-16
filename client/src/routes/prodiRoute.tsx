import ProdiBerandaPage from '@/pages/beranda/ProdiBerandaPage'
import { ProdiLayout } from '@/pages/prodi'
import ProdiLoginPage from '@/pages/prodi/auth/ProdiLoginPage'
import ProdiDetailBuku from '@/pages/prodi/buku/ProdiDetailBuku'
import ProdiSemuaBukuDikembalikan from '@/pages/prodi/buku/ProdiSemuaBukuDikembalikan'
import ProdiSemuaBukuDiperpanjang from '@/pages/prodi/buku/ProdiSemuaBukuDiperpanjang'
import ProdiSemuaBukuDipinjam from '@/pages/prodi/buku/ProdiSemuaBukuDipinjam'
import ProdiSemuaBukuHilangPage from '@/pages/prodi/buku/ProdiSemuaBukuHilangPage'
import ProdiSemuaBukuPage from '@/pages/prodi/buku/ProdiSemuaBukuPage'
import DetailPengguna from '@/pages/prodi/pengguna/DetailPengguna'
import ProdiBlockedPenggunPage from '@/pages/prodi/pengguna/ProdiBlockedPenggunPage'
import ProdiPengajuanPenggunaPage from '@/pages/prodi/pengguna/ProdiPengajuanPenggunaPage'
import ProdiPenggunaDosenPage from '@/pages/prodi/pengguna/ProdiPenggunaDosenPage'
import ProdiPenggunaMahasiswaPage from '@/pages/prodi/pengguna/ProdiPenggunaMahasiswaPage'
import ProdiSemuaPenggunaPage from '@/pages/prodi/pengguna/ProdiSemuaPenggunaPage'
import DetailPustakawan from '@/pages/prodi/pustakawan/DetailPustakawan'
import SemuaPustakawan from '@/pages/prodi/pustakawan/SemuaPustakawan'
import { RouteObject } from 'react-router-dom'

const prodiRoute : RouteObject[] = [
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

export default prodiRoute