import { Separator } from '@/components/ui/separator'
import ProfileData from '@/components/pengguna/ProfilPengguna/ProfileData'

const GeneralProfilePage = () => {
  return (
    <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Pribadi</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data profil utama yang digunakan untuk keperluan akademik dan identifikasi akun.</p>

      <main className='w-full grid grid-cols-2 gap-4 mt-10'>
        <ProfileData label='Nama Lengkap' value='Aan Bahudin' isEditable={true} />
        <ProfileData label='Kelas' value='D' isEditable={true} />
        <ProfileData label='Angkatan' value='2021' />
        <ProfileData label='Jurusan' value='Teknik Informatika' />
      </main>

      <h1 className='w-full text-2xl font-semibold mt-10'>Kontak</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data yang digunakan untuk keperluan komunikasi</p>

      <main className='w-full grid grid-cols-2 gap-4 mt-10'>
        
        <ProfileData label='Telepon' value='08123473942'  isEditable={true}/>
      </main>

      <h1 className='w-full text-2xl font-semibold mt-10'>Identitas Kampus</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Informasi unik Anda dalam sistem kampus</p>

      <main className='w-full grid grid-cols-2 gap-4 my-10'>
        <ProfileData label='NIM / NIDN' value='21650166' />
        <ProfileData label='Role' value='Mahasiswa'/>
      </main>
    </section>
  )
}

export default GeneralProfilePage