import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'
import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'
import PengaturanTambahKondisiDialog from './PengaturanTambahKondisiDialog'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash, Edit } from 'lucide-react'
import { formatRupiah } from '@/utils/formatCurrency'
import PengaturanKondisiBukuDialog from './PengaturanKondisiBukuDialog'
import PengaturanKondisiBukuAlert from './PengaturanKondisiBukuAlert'

const PustakawanKondisiBukuSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['kondisi'],
    queryFn: getAllKondisi
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <section className='w-full flex items-center justify-between mt-10'>
        <h1 className='text-3xl font-bold'>Klasifikasi Kondisi Buku</h1>
        <PengaturanTambahKondisiDialog>
          <Button className='text-xs flex items-center gap-x-2 hover:bg-primary/40 ease-in-out duration-200'>
            <PlusCircle />
            <p>Kondisi</p>
          </Button>
        </PengaturanTambahKondisiDialog>
      </section>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap buku memiliki penilaian kondisi fisik untuk menentukan kelayakan dan perhitungan denda. Klasifikasi ini membantu pustakawan dan pengguna memahami standar pemeliharaan koleksi. Kondisi biasanya mencakup kategori seperti Baik, Rusak Ringan, Rusak Berat, hingga Hilang.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 py-4 border-b flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-semibold text-white'>{item.kondisi}</h4>
                <p className='text-sm text-muted-foreground '>{formatRupiah(item.denda)}</p>
                <p className='text-xs my-2 text-muted-foreground'>{item.deskripsi}</p>
              </div>

              <div className='w-fit flex items-center gap-x-4'> 
                <PengaturanKondisiBukuDialog dataKondisi={item}>
                  <Button className='hover:bg-primary/30 duration-200 ease-in-out' size='icon'><Edit /></Button>
                </PengaturanKondisiBukuDialog>

                <PengaturanKondisiBukuAlert idKondisi={item._id}>
                  <Button size='icon' variant='destructive' className='hover:bg-destructive/30 duration-200 ease-in-out'><Trash /></Button>  
                </PengaturanKondisiBukuAlert>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}

export default PustakawanKondisiBukuSection