import { ContactCardType, TestimonialsDataType } from "@/types/constantsTypes";
import { ChartConfig } from "@/components/ui/chart";
import { BookCopy, LibraryBig, Users, Mail, MapPin, BellRing, Calendar, LaptopMinimal, LockKeyhole, Figma, Code, Database, Layout, Layers, GitGraph} from "lucide-react"

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

export const contactCard : ContactCardType[] = [
  {
    title: 'Kontak',
    value: 'perpustakaanteknikinformatika@gmail.com',
    icon: <Mail className='stroke-primary' />
  },
  {
    title: 'Alamat',
    value: 'Lipu, Kec. Betoambari, Kota Bau-Bau, Sulawesi Tenggara',
    icon: <MapPin className='stroke-primary' />
  }
]
  
export const galleryPict = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905005/k861oq846rph9u5b1oh3.jpg'
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745905004/s1yqle6mjxcykd1brkrq.jpg'
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745904999/lks7kqyid1aozwoibpag.jpg'
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745904996/nonf0gcw31ta7gimzsf6.jpg'
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dhthnjizr/image/upload/v1745904995/afflxn84nr26h664crat.jpg'
  }
]

export const layananCardData = [
  {
    id: 1,
    title: 'Notifikasi',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    icon: <LockKeyhole className='stroke-primary dark:stroke-white' size={25} />
  },
  {
    id: 2,
    title: 'Keamanan',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    icon: <BellRing className='stroke-primary dark:stroke-white' size={25} />
  },
  {
    id: 3,
    title: 'Jadwal',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    icon: <Calendar className='stroke-primary dark:stroke-white' size={25} />
  },
  {
    id: 4,
    title: 'Akses',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    icon: <LaptopMinimal className='stroke-primary dark:stroke-white' size={25} />
  },
  
]

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
]

export const chartConfig = {
  desktop: {
      label: "Desktop",
      color: "#2563eb",
  },
  mobile: {
      label: "Mobile",
      color: "#60a5fa",
  },
} satisfies ChartConfig

export const kategori = [
  {
    title: 'UI/UX',
    icon: <Figma />
  },
  {
    title: 'Coding',
    icon: <Code />
  },
  {
    title: 'Web Design',
    icon: <Layout />
  },
  {
    title: 'Database',
    icon: <Database />
  },
  {
    title: 'Data Science',
    icon: <Layers />
  },
  {
    title: 'Algoritma',
    icon: <GitGraph />
  },
  
]

export const profileMenulinks = [
  {
    id: 1,
    title: 'general',
    url: '.'
  },
  {
    id: 2,
    title: 'credentials',
    url: 'credentials'
  },
  {
    id: 3,
    title: 'status',
    url: 'status'
  }
]

export const kelasEnum = ['A', 'B', 'C', 'D', 'E', 'F']

export const tabsMenu = [
  {
    id: 1,
    title: 'semua'
  },
  {
    id: 2,
    title: 'diterima'
  },
  {
    id: 3,
    title: 'ditolak'
  },
  {
    id: 4,
    title: 'diajukkan'
  },
  {
    id: 5,
    title: 'dipinjam'
  }
  
]