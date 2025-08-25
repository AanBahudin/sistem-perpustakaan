import { Badge } from "@/components/ui/badge"
import DetailBukuBadge from "./DetailBukuBadge"
import DetailBukuInfo from "./DetailBukuInfo"

const BookDetailInfo = ({data} : {data: any}) => {

    const newTahun = new Date(data.tahunTerbit).getFullYear()
    
    return (
        <section className='flex-1'>
        <main className='flex items-center justify-between w-full'>
            <Badge variant='secondary' className='text-xs text-white'>Detail Buku</Badge>
            <DetailBukuBadge lihat={data.totalDilihat} like={data.totalDisukai} simpan={data.totalDisimpan} />
        </main>

        <h1 className='text-xl font-semibold'>{data.judul}</h1>
        <p className='text-xs text-muted-foreground'>Oleh {data.penulis}, Tahun {newTahun}</p>

        <main className='my-2'>
            <p className='text-xs font-semibold'>Tagline</p>
            <p className='text-xs text-muted-foreground text-justify'>{data.tagline}</p>
        </main>

        <DetailBukuInfo buku={data} />

        <main className=''>
            <p className='text-xs font-semibold'>Deskripsi</p>
            <p className='text-xs text-muted-foreground text-justify'>{data.deskripsi}</p>
        </main>

        <main className='my-2'>
            <p className='text-xs font-semibold'>Kategori</p>
            <div className='flex gap-x-2 items-center flex-wrap mt-2'>
            {data.kategori.map((item: string, index: number) => {
                return <Badge key={index} className='text-xs text-white'>{item}</Badge>
            })}
            </div>
        </main>
        </section>
    )
}
export default BookDetailInfo