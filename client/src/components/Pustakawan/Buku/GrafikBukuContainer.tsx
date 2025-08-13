import { AlignEndHorizontal, Ratio } from "lucide-react"
import BukuGrowthChart from "./BukuGrowthChart"
import KategoriSemuaBukuRatio from "./SemuaBuku/KategoriSemuaBukuRatio"
import SpecificBukuRatioChart from "./SpecificBukuRatioChart"

type GrafikBukuContainerType = {
  judulStatistik: string
  dataStatistik: any,
  judulRasio: string,
  dataRasio: any,
  labelDataRasio?: any,
  type?: string
}

const GrafikBukuContainer = ({
    judulStatistik, dataStatistik,
    judulRasio, dataRasio, labelDataRasio,
    type = 'Spesifik'
} : GrafikBukuContainerType) => {
  return (
    <section className="w-full border rounded-2xl bg-transparent h-[40vh] p-3 flex items-start justify-center">
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

      <main className="flex-1 max-h-full flex flex-col items-center justify-center">
          <h1 className='font-semibold items-center flex gap-x-4 capitalize'>
            <Ratio  className='w-4 h-4 stroke-muted-foreground' /> 
            {judulRasio}
          </h1>
          
          {type === 'Semua' ? (
            <KategoriSemuaBukuRatio dataRasio={dataRasio} />
          ) : (
            <SpecificBukuRatioChart dataRasio={dataRasio} labelRasio={labelDataRasio} />
          )}
      </main>
    </section>
  )
}

export default GrafikBukuContainer