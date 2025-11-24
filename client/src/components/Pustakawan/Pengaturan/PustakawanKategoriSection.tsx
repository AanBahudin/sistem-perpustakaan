import getAllKategori from '@/actions/Shared/Kategori/getAllKategoriAction'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Container from '@/globals/Container'
import { Button } from '@/components/ui/button'
import {PlusCircle} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import PengaturanTambahKategoriDialog from './PengaturanTambahKategoriDialog '
import PengaturanHapusKategoriAlert from './PengaturanHapusKategoriAlert '
import PengaturanEditKategoriDialog from './PengaturanEditKategoriDialog'
import PengaturanSectionLoading from './PengaturanSectionLoading'

const PustakawanKategoriSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['kategori'],
    queryFn: getAllKategori
  })

  if (isLoading) return <PengaturanSectionLoading />


  const groupedCategories = data.data.reduce((acc: any, kategori: any) => {
    const firstLetter = kategori.nama.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push({nama: kategori.nama, id: kategori._id})
    return acc
  }, {})

  
  return (
    <Container className='w-full my-6 min-h-[80vh]'>

      <section className='w-full flex mt-10 items-center justify-between'>
        <h1 className='text-3xl font-bold'>Daftar Kategori Koleksi Perpustakaan</h1>
        <PengaturanTambahKategoriDialog>
          <Button className='text-xs flex items-center gap-x-2 hover:bg-primary/40 ease-in-out duration-200'>
            <PlusCircle />
            <p>Kategori</p>
          </Button>
        </PengaturanTambahKategoriDialog>
      </section>

      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Semua koleksi buku di perpustakaan dikelompokkan berdasarkan kategori untuk memudahkan pencarian. Setiap kategori diurutkan menurut huruf abjad, sehingga pengguna dapat dengan cepat menemukan bidang ilmu atau topik yang dibutuhkan.</h5>

      <section className='w-full flex flex-col gap-y-4 my-8 '>
        {Object.keys(groupedCategories).sort().map((letter: any, index: number) => {
          const kategoriesArray = groupedCategories[letter]
          return (
            <div key={index} className='w-full min-h-[15vh]'>
              <main className='w-full flex items-center gap-x-8'>
                <h4 className='text-3xl text-muted-foreground font-semibold'>{letter}</h4>
                <Separator className='flex-1' />
              </main>
      
              <main className='w-full flex items-center justify-start flex-wrap gap-4 mt-4'>
                {kategoriesArray.map((item: any, index: number) => {
                  const { nama: kategori, id } = item
                  return (
                    <div>
                      <Badge key={index} className='text-xs gap-x-2 text-white cursor-default bg-primary hover:bg-primary/30 duration-200 ease-in-out [&>svg]:pointer-events-auto'>
                        {kategori}
                        
                        <section className='w-full flex items-center gap-x-1'>
                          <PengaturanEditKategoriDialog dataKategori={item} /> 
                          <PengaturanHapusKategoriAlert idKategori={id} />
                        </section>
                      </Badge>
                    </div>
                  )
                })}
              </main>
            </div>
          )
        })}
      </section>
    </Container>
  )
}

export default PustakawanKategoriSection