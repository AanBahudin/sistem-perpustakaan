import { getDurasi } from '@/actions/durasiActions'
import { getDenda } from '@/actions/GlobalActions/DendaActions'
import { getAllKategori } from '@/actions/kategoriAction'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Container from '@/globals/Container'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'
import { Edit, Trash } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { formatRupiah } from '@/utils/formatCurrency'
import { getAllKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'

const PustakawanPengaturanPage = () => {

  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <PustakawanPengaturanTabsMenu />
      {(currentParams === 'Kondisi Buku' || !currentParams) && <PustakawanKondisiBukuSection />}
      {currentParams === 'Denda' && <PustakawanDendaSection />}
      {currentParams === 'Kategori' && <PustakawanKategoriSection />}
      {currentParams === 'Durasi' && <PustakawanDurasiSection />}
    </Container>
  )
}

const PustakawanPengaturanTabsMenu = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'
  const fullParams = new URLSearchParams(searchParams)
  const values: Array<string> = ['Kondisi Buku', 'Denda', 'Kategori', 'Durasi']

  const handleClick = (value: string) => {
    if (value === 'Kondisi Buku') {
      fullParams.delete('menu')
    } else {
      fullParams.set('menu', value)
    }

    navigate(`?${fullParams.toString()}`)
  }

  return (
    <section className='w-full flex items-center justify-start gap-x-4 my-4'>
      {values.map((item: string, index: number) => {
        const isActiveMenu = currentParams === item
        return (
          <main onClick={() => handleClick(item)} key={index} className={`${isActiveMenu ? 'bg-primary/80  text-white' : 'bg-transparent hover:bg-muted'} min-w-[150px] text-xs cursor-default duration-200 ease-in-out text-muted-foreground px-2 rounded-lg py-2 border text-center`}>
            <p>{item}</p>
          </main>
        )
      })}
    </section>
  )
}

const PustakawanKondisiBukuSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['kondisi'],
    queryFn: getAllKondisi
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Klasifikasi Kondisi Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap buku memiliki penilaian kondisi fisik untuk menentukan kelayakan dan perhitungan denda. Klasifikasi ini membantu pustakawan dan pengguna memahami standar pemeliharaan koleksi. Kondisi biasanya mencakup kategori seperti Baik, Rusak Ringan, Rusak Berat, hingga Hilang.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 py-4 border-b flex items-center justify-between'>
              <div>
                <h4 className='text-sm text-white font-semibold flex items-center gap-x-3'>Kondisi - <Badge className='text-xs text-white'>{item.kondisi}</Badge></h4>
                <p className='text-sm '>{formatRupiah(item.denda)}</p>
                <p className='text-xs my-2 text-muted-foreground'>{item.deskripsi}</p>
              </div>

              <div className='w-fit flex items-center gap-x-4'> 
                <Button size='icon'><Edit /></Button>
                <Button size='icon' variant='destructive'><Trash /></Button>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}

const PustakawanDendaSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['denda'],
    queryFn: getDenda
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Ketentuan Denda Peminjaman Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Denda diberlakukan sebagai bentuk tanggung jawab pengguna dalam menjaga koleksi perpustakaan. Besaran denda ditentukan berdasarkan keterlambatan pengembalian. Pastikan buku dikembalikan tepat waktu dan dalam keadaan baik untuk menghindari biaya tambahan.</h5>

      <section className='w-full flex items-center justify-between my-10'>
        <Label className='capitalize text-md text-muted-foreground'>Nominal denda keterlambatan</Label>
        <main className='w-fit flex items-center justify-center gap-x-4'>
          <Input type='text' defaultValue={formatRupiah(data)} readOnly />
          <Button size='sm'><Edit /></Button>
        </main>
      </section>
    </Container>
  )
}

const PustakawanKategoriSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['kategori'],
    queryFn: getAllKategori
  })

  if (isLoading) return <h1>Loading....</h1>


  const groupedCategories = data.data.reduce((acc: any, kategori: any) => {
    const firstLetter = kategori.nama.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(kategori.nama)
    return acc
  }, {})

  
  return (
    <Container className='w-full my-6 min-h-[80vh'>
      <h1 className='text-3xl font-bold mt-10'>Daftar Kategori Koleksi Perpustakaan</h1>
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
                {kategoriesArray.map((item: string, index: number) => {
                  return (
                    <Badge key={index} className='text-xs text-white cursor-default bg-primary hover:bg-primary/30 duration-200 ease-in-out'>{item}</Badge>
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
                <Button size='icon' variant='destructive'><Trash /></Button>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}

export default PustakawanPengaturanPage