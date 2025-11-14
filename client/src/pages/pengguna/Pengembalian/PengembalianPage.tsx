import PeminjamanLoading from "@/components/pengguna/peminjaman Pengguna/PeminjamanLoading"
import PengembalianSearch from '@/components/pengguna/Pengembalian Pengguna/PengembalianSearch'
import PengembalianDataLayout from '@/components/pengguna/Pengembalian Pengguna/PengembalianDataLayout'
import DataPagination from '@/components/pengguna/peminjaman Pengguna/DataPagination'
import useFetchAllPengembalianPengguna from '@/hooks/fetchHooks/penggunaHooks/pengembalian/useFetchAllPengembalianPengguna'

const PengembalianPage = () => {

  const { data: pengembalianData, isLoading } = useFetchAllPengembalianPengguna()

  return (
    <main className="min-h-[80vh] col-span-9">
      <PengembalianSearch />

      {isLoading ? <PeminjamanLoading /> : (
        <>
          <PengembalianDataLayout pengembalianData={pengembalianData.data} />
          {pengembalianData.data.length !== 0 && <DataPagination totalPage={pengembalianData.totalPage} />}
        </>
      )}
    </main>
  )
}

export default PengembalianPage