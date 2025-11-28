import DataPagination from '@/components/pengguna/peminjaman Pengguna/DataPagination'
import PeminjamanLoading from '@/components/pengguna/peminjaman Pengguna/PeminjamanLoading'
import {
  PerpanjanganDataLayout,
  PerpanjanganSearchInput,
  PerpanjanganTab,
} from '@/components/pengguna/Perpanjangan Pengguna'
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