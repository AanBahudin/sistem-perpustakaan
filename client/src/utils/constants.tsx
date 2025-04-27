import { BookCopy, LibraryBig, Users, } from "lucide-react"

export const accordions = [
    {
        id: 1,
        question: 'Bagaimana cara mendaftar akun perpustakaan?',
        answer: 'Untuk mendaftar, silakan isi formulir pendaftaran di halaman registrasi. Setelah itu, Anda akan menerima email verifikasi. Akun Anda akan aktif setelah diverifikasi oleh pihak program studi.'
    },
    {
        id: 2,
        question: 'Apa yang harus dilakukan jika saya tidak menerima email verifikasi?',
        answer: 'Periksa folder spam atau junk mail Anda. Jika tidak ditemukan, silakan coba kirim ulang email verifikasi dari halaman login.'
    },
    {
        id: 3,
        question: 'Berapa lama durasi peminjaman buku?',
        answer: 'Durasi peminjaman standar adalah 14 hari, namun Anda bisa memilih durasi yang tersedia saat mengajukan peminjaman.'
    },
    {
        id: 4,
        question: 'Bagaimana jika saya telat mengembalikan buku?',
        answer: 'Anda akan dikenakan denda keterlambatan per hari sesuai dengan ketentuan yang berlaku. Besar denda dapat dilihat di halaman peminjaman.'
    },
    {
        id: 5,
        question: 'Apa yang terjadi jika buku yang saya pinjam rusak atau hilang?',
        answer: 'Anda akan dikenakan denda berdasarkan kondisi buku saat dikembalikan. Jika buku hilang, Anda wajib menggantinya sesuai dengan harga pengganti yang tertera.'
    },
    {
        id: 6,
        question: 'Bagaimana cara mengetahui status peminjaman saya?',
        answer: 'Anda bisa melihat status peminjaman melalui dashboard akun Anda di bagian "Peminjaman Saya".'
    },
]

export const stats = [
    {
        total: '2432+',
        text: 'Anggota Terdaftar',
        icon: <Users className="mb-4 stroke-primary" size={40}  />
    },
    {
        total: '230+',
        text: 'Jumlah Buku',
        icon: <LibraryBig className="mb-4 stroke-primary" size={40}  />
    },
    {
        total: "34+",
        text: "Kategori Buku",
        icon: <BookCopy className="mb-4 stroke-primary" size={40}  />
    }
]