import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { profileAction } from '@/actions/userActions'
import EditEmailDialog from '@/components/pengguna/Profil Pengguna/EditEmailDialog'
import EditPasswordDialog from '@/components/pengguna/Profil Pengguna/EditPasswordDialog'

const CredentialsProfilePage = () => {
  
  const {data, isLoading} = useQuery({
      queryKey: ['pengguna', 'profil'],
      queryFn: profileAction
    })
  
  
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