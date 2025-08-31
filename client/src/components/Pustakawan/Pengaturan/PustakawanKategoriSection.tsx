import { getAllKategori } from '@/actions/kategoriAction'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'

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

export default PustakawanKategoriSection