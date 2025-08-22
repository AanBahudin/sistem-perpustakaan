import { getProfilePustakawan } from "@/actions/Pustakawan/pustakawanProfileActions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const PustakawanBerandaWelcomeSign = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['profil'],
    queryFn: getProfilePustakawan
  })

  return (
    <section className='w-full rounded-2xl bg-transparent border min-h-[25vh] flex justify-center flex-col py-3 px-6'>
      {isLoading ? (
        <Skeleton className="w-[40px] h-4" />
      ) : (
        <h1 className='text-white font-semibold text-2xl'>Hallo, {data.nama}🙌</h1>
      )}
      <p className='text-xs mt-4 text-white'>Selamat datang di Dashboard Pustakawan. Di sini Anda dapat mengelola koleksi buku, memantau peminjaman, serta memastikan setiap layanan perpustakaan berjalan dengan lancar. Mari wujudkan pengalaman terbaik bagi mahasiswa dan dosen dalam mencari serta mengakses sumber pengetahuan</p>

      <Button size='sm' className='w-[20%] text-xs mt-5 font-normal border text-white bg-accent/40' asChild >
        <Link to={'/pustakawan/pengajuan'}>Lihat</Link>
      </Button>
    </section>
  )
}

export default PustakawanBerandaWelcomeSign