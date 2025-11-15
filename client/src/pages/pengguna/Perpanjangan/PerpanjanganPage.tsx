
import DataPagination from '@/components/pengguna/peminjaman Pengguna/DataPagination'
import PeminjamanLoading from '@/components/pengguna/peminjaman Pengguna/PeminjamanLoading'
import PerpanjanganDataLayout from '@/components/pengguna/Perpanjangan Pengguna.tsx/PerpanjanganDataLayout'
import PerpanjanganSearch from '@/components/pengguna/Perpanjangan Pengguna.tsx/PerpanjanganSearch'
import PerpanjanganTab from '@/components/pengguna/Perpanjangan Pengguna.tsx/PerpanjanganTab'
import useFetchAllPerpanjanganPengguna from '@/hooks/fetchHooks/penggunaHooks/perpanjangan/useFetchAllPerpanjanganPengguna'

const PerpanjanganPage = () => {

  const {data: dataPerpanjangan, isLoading} = useFetchAllPerpanjanganPengguna()

  return (
    <main className='min-h-[80vh] col-span-9'>
      <PerpanjanganTab />
      <PerpanjanganSearch />

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