import PeminjamanSearch from "@/components/pengguna/peminjaman Pengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjaman Pengguna/PeminjamanTab"
import PeminjamanLoading from "@/components/pengguna/peminjaman Pengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjaman Pengguna/PeminjamanDataLayout"
import DataPagination from "@/components/pengguna/peminjaman Pengguna/DataPagination"
import useFetchAllPeminjamanPengguna from "@/hooks/fetchHooks/penggunaHooks/peminjaman/useFetchAllPeminjamanPengguna"

const PeminjamanPage = () => {

  const {data: dataPeminjaman, isLoading} = useFetchAllPeminjamanPengguna()

  return (
    <main className="min-h-[90vh] col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />
        
      {isLoading ? <PeminjamanLoading /> : (
        <>
          <PeminjamanDataLayout peminjamanData={dataPeminjaman.data} />
          {dataPeminjaman.data.length !== 0 && <DataPagination totalPage={dataPeminjaman.totalPage} />}
        </>
      )}

    </main>
  ) 
}

export default PeminjamanPage   