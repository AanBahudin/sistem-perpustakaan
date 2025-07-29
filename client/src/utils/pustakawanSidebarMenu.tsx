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
                url: 'pengajuan',
                icon: Files
            },
            {
                title: 'Peminjaman',
                url: 'pengajuan/peminjaman',
                icon: FileCheck2
            },
            {
                title: 'Perpanjangan',
                url: 'pengajuan/perpanjangan',
                icon: FilePlus
            },
            {
                title: 'Pengembalian',
                url: 'pengajuan/pengembalian',
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
                url: 'buku',
                icon: BookCopy
            },
            {
                title: 'Dipinjam',
                url: 'buku/peminjaman',
                icon: BookCheck
            },
            {
                title: 'Diperpanjang',
                url: 'buku/perpanjangan',
                icon: BookUp
            },
            {
                title: 'Dikembalikan',
                url: 'buku/pengembalian',
                icon: BookDown
            },
            {
                title: 'Hilang',
                url: 'buku/hilang',
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
                url: 'riwayat',
                icon: Files
            },
            {
                title: 'Peminjaman',
                url: 'riwayat/peminjaman',
                icon: FileCheck2
            },
            {
                title: 'Perpanjangan',
                url: 'riwayat/perpanjangan',
                icon: FilePlus
            },
            {
                title: 'Pengembalian',
                url: 'riwayat/pengembalian',
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