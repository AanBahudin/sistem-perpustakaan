import { Bell, Cog, History, House, LibraryBig, Newspaper, User, Users } from "lucide-react"

export const pustakanSidebarMenu = [
    {
        title: 'Dashboard',
        url: '/pustakawan',
        icon: House
    },
    {
        title: 'Pengguna',
        url: 'pengguna',
        icon: Users
    },
    {
        title: 'Pengajuan',
        url: 'pengajuan',
        icon: Newspaper
    },
    {
        title: 'Buku',
        url: 'buku',
        icon: LibraryBig
    },
    {
        title: 'Riwayat',
        url: 'riwayat',
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