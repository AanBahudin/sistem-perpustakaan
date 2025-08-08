import { AlignEndHorizontal, Ratio } from 'lucide-react';
import PengajuanRatioDougnut from './PengajuanRatioDougnut';
import PengajuanGrowthChart from './PengajuanGrowthChart';

type GrafikPertumbuhanPengajuanContainerType = {
    monthlyPengajuanGrowth: any,
    pengajuanRatio: any
}

const GrafikPertumbuhanPengajuanContainer = ({monthlyPengajuanGrowth, pengajuanRatio} : GrafikPertumbuhanPengajuanContainerType) => {
  return (
    <section className="w-full border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
        <main className="w-[70%] border-r h-full flex flex-col justify-between gap-y-5 items-start">
            <h1 className="font-semibold text-lg flex items-center gap-x-4 px-6">
                <AlignEndHorizontal className='w-4 h-4 stroke-muted-foreground' /> 
                Ini judul
            </h1>

            {monthlyPengajuanGrowth?.length === 0 && (
              <div className='w-full h-full flex items-center justify-center flex-col mt-20'>
                <h1 className='text-center text-muted-foreground text-sm'>Belum ada pertumbuhan</h1>
              </div>
            )}
            <PengajuanGrowthChart monthlyPengajuanGrowth={monthlyPengajuanGrowth} />
            
        </main>

        <main className="flex-1 max-h-full flex flex-col items-center justify-center">
            <h1 className='font-semibold items-center flex gap-x-4 capitalize'>
              <Ratio  className='w-4 h-4 stroke-muted-foreground' /> 
              Rasio Perbandingan Pengajuan
              
            </h1>

            <PengajuanRatioDougnut pengajuanRatio={pengajuanRatio} />
        </main>
    </section>
  )
}

export default GrafikPertumbuhanPengajuanContainer