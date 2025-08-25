import Container from '@/globals/Container'
import DetailBukuBreadcrumbs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuBreadcrumbs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSingleBukuPustakawan } from '@/actions/Pustakawan/pustakawanBukuActions'
import DetailBukuTabs from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuTabs'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Eye, LucideIcon, SaveIcon, ThumbsUp } from 'lucide-react'
import GlobalTooltip from '@/globals/GlobalTooltip'
import DetailBukuInfo from '@/components/Pustakawan/Buku/DetailBuku/DetailBukuInfo'

const PustakawanDetailBuku = () => {

  const { idBuku } = useParams()

  const {data, isLoading} = useQuery({
    queryKey: ['detail', 'buku', idBuku],
    queryFn: () => getSingleBukuPustakawan({idBuku: idBuku as string})
  })

  if (isLoading) return <h1>Loading....</h1>

  return (
    <Container className='w-full'>
      <DetailBukuBreadcrumbs text={data.judul} />
      <DetailBukuTabs />

      

      {/* BOOK CONTAINER */}
      <section className='w-full flex items-start gap-x-8 my-4'>
        {/* DETAIL BUKU SECTION */}
        <main className='w-3/4 min-h-[40vh] rounded-xl flex items-start justify-start gap-x-4'>
          <img className='w-36 h-56 rounded' src={data.cover} alt={data.judul} />        

          <div className='flex-1'>
            <div className='flex items-center justify-between w-full'>
              <Badge variant='secondary' className='text-xs text-white'>Detail Buku</Badge>
              <DetailBukuBadge lihat={data.totalDilihat} like={data.totalDisukai} simpan={data.totalDisimpan} />
            </div>

            <h1 className='text-xl font-semibold'>{data.judul}</h1>
            <p className='text-xs text-muted-foreground'>Oleh {data.penulis}, {data.tahunTerbit}</p>

            <div className='my-2'>
              <p className='text-xs font-semibold'>Tagline</p>
              <p className='text-xs text-muted-foreground text-justify'>{data.tagline}</p>
            </div>

            <DetailBukuInfo buku={data} />

            <div className=''>
              <p className='text-xs font-semibold'>Deskripsi</p>
              <p className='text-xs text-muted-foreground text-justify'>{data.deskripsi}</p>
            </div>

            <div className='my-2'>
              <p className='text-xs font-semibold'>Kategori</p>
              <div className='flex gap-x-2 items-center flex-wrap mt-2'>
                {data.kategori.map((item: string, index: number) => {
                  return <Badge key={index} className='text-xs text-white'>{item}</Badge>
                })}
              </div>
            </div>
          </div>

        </main>
        <Calendar className='rounded border p-2' />
      </section>
    </Container>
  )
}

const DetailBukuBadge = ({like = 0, lihat = 0, simpan = 0} : {like: number, lihat: number, simpan: number}) => {
  const value: Array<number> = [like, simpan, lihat]
  const Icons: Array<LucideIcon> = [ThumbsUp, SaveIcon, Eye]
  const text: Array<string> = ['Suka', 'Simpan', 'Lihat']

  return (
    <section className='flex items-center gap-x-2'>
      {value.map((item: number, index: number) => {
        const Icon: LucideIcon = Icons[index]
        return (
          <GlobalTooltip text={text[index]}>
            <Badge className='text-white flex items-center'>
              <Icon />
              {item}
            </Badge>
          </GlobalTooltip>
        )
      })}
    </section>
  )
}

export default PustakawanDetailBuku