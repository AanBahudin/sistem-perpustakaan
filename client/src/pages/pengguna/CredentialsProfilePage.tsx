import { Separator } from '@/components/ui/separator'
import ProfileData from '@/components/pengguna/ProfilPengguna/ProfileData'

const CredentialsProfilePage = () => {
  return (
    <section className='w-full min-h-[70vh] grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Keamanan</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Informasi keamanan akun </p>

      <main className='w-full grid grid-cols-2 gap-4 mt-10'>
        <ProfileData label='Email' value='aan.bahudin11@gmail.com' isEditable={true} />
        <ProfileData label='Password' value='Aan Bahudin' isEditable={true} />
      </main>
    </section>
  )
}

export default CredentialsProfilePage