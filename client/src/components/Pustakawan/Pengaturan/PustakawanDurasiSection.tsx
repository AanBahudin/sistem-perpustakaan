import { getDurasi } from '@/actions/durasiActions'
import { Button } from '@/components/ui/button'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { Edit, Trash } from 'lucide-react'
import PengaturanDurasiPinjamAlert from './PengaturanDurasiPinjamAlert'


const PustakawanDurasiSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['durasi'],
    queryFn: getDurasi
  })

  if (isLoading) return <h1>Loading....</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Durasi Peminjaman Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap pengguna memiliki batas waktu tertentu dalam meminjam buku. Durasi ini ditetapkan agar semua anggota perpustakaan mendapatkan kesempatan yang sama untuk mengakses koleksi. Apabila melebihi batas waktu, maka akan dikenakan denda sesuai ketentuan yang berlaku.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 p-4 border-b flex items-center justify-between'>
              <h4 className='text-sm text-muted-foreground'>{item.durasi} Hari Peminjaman</h4>

              <div className='w-fit flex items-center gap-x-4'>
                <Button size='icon'><Edit /></Button>
                <PengaturanDurasiPinjamAlert idDurasi={item._id}>
                  <Button size='icon' variant='destructive'><Trash /></Button>
                </PengaturanDurasiPinjamAlert>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}

export default PustakawanDurasiSection