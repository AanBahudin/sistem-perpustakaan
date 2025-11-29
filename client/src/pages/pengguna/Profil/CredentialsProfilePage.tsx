import { Separator } from '@/components/ui/separator'
import {EditEmailDialog, EditPasswordDialog} from '@/components/pengguna/ProfilPengguna'
import useFetchProfilPengguna from '@/hooks/fetchHooks/penggunaHooks/profil/useFetchProfilPengguna'

const CredentialsProfilePage = () => {
  
  const {data, isLoading} = useFetchProfilPengguna()
    if (isLoading) return <h1>Loading...</h1>

  return (
    <section className='w-full min-h-[70vh] grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold'>Keamanan</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Informasi keamanan akun </p>

      <main className='w-full grid grid-cols-2 gap-4 mt-10'>
        <EditEmailDialog data={data} />
        <EditPasswordDialog />
      </main>
    </section>
  )
}

export default CredentialsProfilePage