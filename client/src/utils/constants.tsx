import { TestimonialsDataType } from "@/types/constantsTypes";
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

export const testimoni : TestimonialsDataType[] = [
    {
      name: "Aan Bahudin",
      position: "Mahasiswa",
      message: "Aplikasi ini benar-benar membantu saya mencari referensi buku untuk tugas akhir. Cepat dan mudah digunakan!",
    },
    {
      name: "Dwi Lestari",
      position: "Dekan",
      message: "Saya bangga dengan inovasi ini. Sistem perpustakaan berbasis web ini meningkatkan akses literatur akademik bagi seluruh civitas kampus.",
    },
    {
      name: "Bima Saputra",
      position: "Ketua Program Studi",
      message: "Sangat mendukung pengembangan akademik mahasiswa. Aplikasi ini membuat pencarian buku lebih terstruktur.",
    },
    {
      name: "Citra Rahmawati",
      position: "Sekretaris",
      message: "Proses administrasi peminjaman buku jauh lebih efisien. Tidak perlu lagi antre lama di perpustakaan!",
    },
    {
      name: "Daniel Pratama",
      position: "Dosen",
      message: "Banyak literatur terbaru yang bisa langsung diakses mahasiswa. Ini tentu sangat membantu proses belajar mengajar.",
    },
    {
      name: "Elsa Nuraini",
      position: "Mahasiswa",
      message: "Fitur pengingat pengembalian buku sangat berguna. Saya tidak pernah lagi telat mengembalikan buku!",
    },
    {
      name: "Fauzan Hakim",
      position: "Dosen",
      message: "UI/UX dari aplikasi ini sangat ramah pengguna, bahkan untuk dosen yang tidak terlalu familiar dengan teknologi.",
    },
    {
      name: "Gita Salsabila",
      position: "Mahasiswa",
      message: "Sistem katalog yang lengkap dan pencarian cepat membuat saya lebih produktif dalam menyusun makalah.",
    },
    {
      name: "Hendra Wijaya",
      position: "Ketua Program Studi",
      message: "Aplikasi ini membawa kemajuan besar dalam pengelolaan literatur di program studi kami. Sukses terus!",
    },
    {
      name: "Intan Maharani",
      position: "Sekretaris",
      message: "Proses verifikasi akun dan peminjaman buku kini jauh lebih tertib dan terdata dengan baik. Sangat membantu administrasi!",
    },
];
  