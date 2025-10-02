import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { profileAction } from '@/actions/userActions'
import { useQuery } from '@tanstack/react-query'

const StatusProfilePage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['pengguna', 'profil'],
    queryFn: profileAction
  })
  
  
  if (isLoading) return <h1>Loading...</h1>

  return (
     <section className='w-full grid-cols-9 flex flex-col justify-start'>
      <h1 className='w-full text-2xl font-semibold mt-10'>Status Akun</h1>
      <Separator className='my-2' />
      <p className='text-muted-foreground'>Data profil status verifikasi dan keaktifan akun.</p>

      <main className='w-full flex flex-col gap-y-8 my-10'>
        <div className='flex flex-col items-start'>
          <h3>Status Akun</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <Button disabled variant={data.verifikasiEmail ? 'default' : 'destructive'} className='text-sm text-white text-center  min-w-1/6 px-6 bg-primary py-2 rounded mt-4 border-spacing-7'>{data.statusAkun}</Button>
        </div>

        <div className='flex flex-col items-start'>
          <h3>Verifikasi Email</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <Button disabled variant={data.verifikasiEmail ? 'default' : 'destructive'} className='text-sm text-white text-center min-w-1/6 px-6 py-2 rounded mt-4 border-spacing-7'>{
            data.verifikasiEmail ? 'Terverifikasi' : 'Belum Verifikasi'
          }</Button>
        </div>

         <div className='flex flex-col items-start'>
          <h3>Verifikasi Program Studi</h3>
          <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, nesciunt.</p>
          <Button disabled variant={data.verifikasiEmail ? 'default' : 'destructive'} className='text-sm text-white text-center  min-w-1/6 px-6 bg-primary py-2 rounded mt-4 border-spacing-7'>{
            data.verifikasiProdi ? 'Terverifikasi' : 'Belum Verifikasi'
          }</Button>
        </div>
      </main>
    </section>
  )
}

export default StatusProfilePage