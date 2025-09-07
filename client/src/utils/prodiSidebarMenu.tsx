import { Bell, BookCheck, BookCopy, BookDashed, BookDown, BookUp, CircleUser, Cog, FileCheck2, FilePlus, Files, FileSymlink, GraduationCap, History, House, LibraryBig, Newspaper, User, UserRoundPlus, UserRoundX, Users } from "lucide-react"

export const prodiSidebarMenu = [
    {
        title: 'Dashboard',
        url: '/prodi',
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
            {
                title: 'Pendaftaran',
                url: 'pengguna/permintaan',
                icon: UserRoundPlus
            },
            {
                title: 'Diblokir',
                url: 'pengguna/blokir',
                icon: UserRoundX
            }
        ],
        icon: Users
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
    // {
    //     title: 'Riwayat',
    //     url: 'riwayat',
    //     type: 'collapse',
    //     children: [
    //         {
    //             title: 'Semua',
    //             url: 'riwayat',
    //             icon: Files
    //         },
    //         {
    //             title: 'Peminjaman',
    //             url: 'riwayat/peminjaman',
    //             icon: FileCheck2
    //         },
    //         {
    //             title: 'Perpanjangan',
    //             url: 'riwayat/perpanjangan',
    //             icon: FilePlus
    //         },
    //         {
    //             title: 'Pengembalian',
    //             url: 'riwayat/pengembalian',
    //             icon: FileSymlink
    //         }
    //     ],
    //     icon: History
    // },
    // {
    //     title: 'Notifikasi',
    //     url: 'notifikasi',
    //     icon: Bell
    // },
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