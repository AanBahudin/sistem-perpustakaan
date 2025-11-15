import { Separator } from '@/components/ui/separator'
import ProfileData from '@/components/pengguna/Profil Pengguna/ProfileData'
import PhotoProfile from '@/components/pengguna/Profil Pengguna/PhotoProfile'
import EditNamaDialog from '@/components/pengguna/Profil Pengguna/EditNamaDialog'
import EditKelasDialog from '@/components/pengguna/Profil Pengguna/EditKelasDialog'
import EditNomorTeleponDialog from '@/components/pengguna/Profil Pengguna/EditNomorTeleponDialog'
import useFetchProfilPengguna from '@/hooks/fetchHooks/penggunaHooks/profil/useFetchProfilPengguna'

const GeneralProfilePage = () => {

  const {data, isLoading} = useFetchProfilPengguna()
  if (isLoading) return <h1>Loading...</h1>


  return (
    <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Pribadi</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data profil utama yang digunakan untuk keperluan akademik dan identifikasi akun.</p>

      <PhotoProfile fotoProfil={data.fotoProfil} />

      <main className='w-full grid grid-cols-2 gap-4'>
        <EditNamaDialog data={data} />
        {data.role === 'Mahasiswa' && <EditKelasDialog data={data} />}
        {data.role === 'Mahasiswa' && <ProfileData label='Angkatan' value={data.angkatan} />}
        <ProfileData label='Jurusan' value={data.jurusan} />
      </main>

      <h1 className='w-full text-2xl font-semibold mt-10'>Kontak</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data yang digunakan untuk keperluan komunikasi</p>

      <main className='w-full grid grid-cols-2 gap-4 mt-10'>
        
        <EditNomorTeleponDialog data={data} />
      </main>

      <h1 className='w-full text-2xl font-semibold mt-10'>Identitas Kampus</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Informasi unik Anda dalam sistem kampus</p>

      <main className='w-full grid grid-cols-2 gap-4 my-10'>
        <ProfileData label='NIM / NIDN' value={data.idKampus} />
        <ProfileData label='Role' value={data.role}/>
      </main>
    </section>
  )
}

export default GeneralProfilePage