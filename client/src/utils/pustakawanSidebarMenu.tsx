import { Bell, CircleUser, Cog, GraduationCap, History, House, LibraryBig, Newspaper, User, Users } from "lucide-react"

export const pustakanSidebarMenu = [
    {
        title: 'Dashboard',
        url: '/pustakawan',
        icon: House
    },
    {
        title: 'Pengguna',
        url: 'pengguna',
        type: 'collapse',
        children: [
            {
                title: 'Semua',
                url: 'pengguna',
                icon: Users
            },
            {
                title: 'Dosen',
                url: 'pengguna/dosen',
                icon: GraduationCap
            },
            {
                title: 'Mahasiswa',
                url: 'pengguna/mahasiswa',
                icon: CircleUser
            },
        ],
        icon: Users
    },
    {
        title: 'Pengajuan',
        url: 'pengajuan',
        type: 'collapse',
        children: [
            {
                title: 'Semua',
                url: '.'
            },
            {
                title: 'Peminjaman',
                url: 'peminjaman'
            },
            {
                title: 'Perpanjangan',
                url: 'perpanjangan'
            },
            {
                title: 'Pengembalian',
                url: 'pengembalian'
            }
        ],
        icon: Newspaper
    },
    {
        title: 'Buku',
        url: 'buku',
        type: 'collapse',
        children: [
            {
                title: 'Semua',
                url: '.'
            },
            {
                title: 'Dipinjam',
                url: 'peminjaman'
            },
            {
                title: 'Diperpanjang',
                url: 'perpanjangan'
            },
            {
                title: 'Dikembalikan',
                url: 'pengembalian'
            },
            {
                title: 'Hilang',
                url: 'hilang'
            }
        ],
        icon: LibraryBig
    },
    {
        title: 'Riwayat',
        url: 'riwayat',
        type: 'collapse',
        children: [
            {
                title: 'Semua',
                url: '.'
            },
            {
                title: 'Peminjaman',
                url: 'peminjaman'
            },
            {
                title: 'Perpanjangan',
                url: 'perpanjangan'
            },
            {
                title: 'Pengembalian',
                url: 'pengembalian'
            }
        ],
        icon: History
    },
    {
        title: 'Notifikasi',
        url: 'notifikasi',
        icon: Bell
    },
    {
        title: 'Pengaturan',
        url: 'pengaturan',
        icon: Cog
    },
    {
        title: 'Profil',
        url: 'profil',
        icon: User
    }
]