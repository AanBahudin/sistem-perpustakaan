import { Separator } from '@/components/ui/separator'
import {
  PhotoProfileContainer,
  ProfileDataContainer,
  EditNamaDialog,
  EditKelasDialog,
  EditNomorTeleponDialog
} from '@/components/pengguna/ProfilPengguna'
import useFetchProfilPengguna from '@/hooks/fetchHooks/penggunaHooks/profil/useFetchProfilPengguna'

const GeneralProfilePage = () => {

  const {data, isLoading} = useFetchProfilPengguna()
  if (isLoading) return <h1>Loading...</h1>


  return (
    <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Pribadi</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data profil utama yang digunakan untuk keperluan akademik dan identifikasi akun.</p>

      <PhotoProfileContainer fotoProfil={data.fotoProfil} />

      <main className='w-full grid grid-cols-2 gap-4'>
        <EditNamaDialog data={data} />
        {data.role === 'Mahasiswa' && <EditKelasDialog data={data} />}
        {data.role === 'Mahasiswa' && <ProfileDataContainer label='Angkatan' value={data.angkatan} />}
        <ProfileDataContainer label='Jurusan' value={data.jurusan} />
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
        <ProfileDataContainer label='NIM / NIDN' value={data.idKampus} />
        <ProfileDataContainer label='Role' value={data.role}/>
      </main>
    </section>
  )
}

export default GeneralProfilePage