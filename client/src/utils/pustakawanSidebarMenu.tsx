import { Bell, BookCheck, BookCopy, BookDashed, BookDown, BookUp, CircleUser, Cog, FileCheck2, FilePlus, Files, FileSymlink, GraduationCap, History, House, LibraryBig, Newspaper, User, Users } from "lucide-react"

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
                url: '.',
                icon: Files
            },
            {
                title: 'Peminjaman',
                url: 'peminjaman',
                icon: FileCheck2
            },
            {
                title: 'Perpanjangan',
                url: 'perpanjangan',
                icon: FilePlus
            },
            {
                title: 'Pengembalian',
                url: 'pengembalian',
                icon: FileSymlink
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
                url: '.',
                icon: BookCopy
            },
            {
                title: 'Dipinjam',
                url: 'peminjaman',
                icon: BookCheck
            },
            {
                title: 'Diperpanjang',
                url: 'perpanjangan',
                icon: BookUp
            },
            {
                title: 'Dikembalikan',
                url: 'pengembalian',
                icon: BookDown
            },
            {
                title: 'Hilang',
                url: 'hilang',
                icon: BookDashed
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
                url: '.',
                icon: Files
            },
            {
                title: 'Peminjaman',
                url: 'peminjaman',
                icon: FileCheck2
            },
            {
                title: 'Perpanjangan',
                url: 'perpanjangan',
                icon: FilePlus
            },
            {
                title: 'Pengembalian',
                url: 'pengembalian',
                icon: FileSymlink
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