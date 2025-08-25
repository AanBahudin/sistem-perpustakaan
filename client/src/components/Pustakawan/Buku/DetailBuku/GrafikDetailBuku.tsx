import { Badge } from '@/components/ui/badge'
import BukuGrowthChart from '../BukuGrowthChart'
import { AlignEndHorizontal } from 'lucide-react'

type GrafikDetailBukuType = {
  judulStatistik: string
  dataStatistik: any,
  dataBuku: any,
  type?: string
} 

const GrafikDetailBuku = ({ judulStatistik, dataStatistik, dataBuku, type} : GrafikDetailBukuType) => {
  return (
    <section className="w-full mb-4 border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
      <main className="w-[70%] border-r h-full flex flex-col justify-between gap-y-5 items-start">
          <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
            <AlignEndHorizontal className='w-4 h-4 stroke-muted-foreground' /> 
            {judulStatistik}
          </h1>

          {dataStatistik?.length === 0 && (
            <div className='w-full h-full flex items-center justify-center flex-col mt-20'>
              <h1 className='text-center text-muted-foreground text-sm'>Belum ada pertumbuhan</h1>
            </div>
          )}
          <BukuGrowthChart dataStatistik={dataStatistik} />
      </main>

      <main className="flex-1 h-fit flex flex-col items-center justify-between">
        <h1 className='font-semibold text-lg'>Stok Buku Tersedia</h1>
        <div className='w-[150px] h-[150px] mt-6 bg-primary/20 rounded-full flex items-center justify-center'>
            <p className='text-8xl font-bold'>{dataBuku.stok}</p>
        </div>
        <p className='text-muted-foreground text-xs mt-1'>Buku tersedia</p>
        <Badge className='text-white mt-8'>Jumlah buku yang dipinjam saat ini : {dataBuku.totalDipinjam}</Badge>
      </main>
    </section>
  )
}

export default GrafikDetailBuku