import getAllDurasiPeminjaman from '@/actions/Shared/Durasi/getAllDurasiPeminjaman'
import { Button } from '@/components/ui/button'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { Edit, Trash, PlusCircle } from 'lucide-react'
import PengaturanDurasiPinjamAlert from './PengaturanDurasiPinjamAlert'
import PengaturanDurasiDialog from './PengaturanDurasiDialog'
import PengaturanTambahDurasiDialog from './PengaturanTambahDurasiDialog'
import PengaturanSectionLoading from './PengaturanSectionLoading'


const PustakawanDurasiSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['durasi'],
    queryFn: getAllDurasiPeminjaman
  })

  if (isLoading) return <PengaturanSectionLoading />

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <section className='w-full flex mt-10 items-center justify-between'>
        <h1 className='text-3xl font-bold'>Durasi Peminjaman Buku</h1>
        <PengaturanTambahDurasiDialog>
          <Button className='text-xs flex items-center gap-x-2 hover:bg-primary/40 ease-in-out duration-200'>
            <PlusCircle />
            <p>Durasi</p>
          </Button>
        </PengaturanTambahDurasiDialog>
      </section>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap pengguna memiliki batas waktu tertentu dalam meminjam buku. Durasi ini ditetapkan agar semua anggota perpustakaan mendapatkan kesempatan yang sama untuk mengakses koleksi. Apabila melebihi batas waktu, maka akan dikenakan denda sesuai ketentuan yang berlaku.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 p-4 border-b flex items-center justify-between'>
              <h4 className='text-sm text-muted-foreground'>{item.durasi} Hari Peminjaman</h4>

              <div className='w-fit flex items-center gap-x-4'>

                <PengaturanDurasiDialog dataDurasi={item} >
                  <Button size='icon'><Edit /></Button>
                </PengaturanDurasiDialog>

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