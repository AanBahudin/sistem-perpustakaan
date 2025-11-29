import DataPagination from '@/components/pengguna/peminjamanPengguna/DataPagination'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import {
  PerpanjanganDataLayout,
  PerpanjanganSearchInput,
  PerpanjanganTab,
} from '@/components/pengguna/PerpanjanganPengguna/index'
import useFetchAllPerpanjanganPengguna from '@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchAllPerpanjanganPengguna'

const PerpanjanganPage = () => {

  const {data: dataPerpanjangan, isLoading} = useFetchAllPerpanjanganPengguna()

  return (
    <main className='min-h-[80vh] col-span-9'>
      <PerpanjanganTab />
      <PerpanjanganSearchInput />

      {isLoading ? <PeminjamanLoading /> : (
        <>
          <PerpanjanganDataLayout data={dataPerpanjangan.data}/>
          {dataPerpanjangan.data.length !== 0 && <DataPagination totalPage={dataPerpanjangan.totalPage} />}
          
        </>
      )}
      
    </main>
  )
}

export default PerpanjanganPage