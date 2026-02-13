import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import DataPagination from "@/components/pengguna/peminjamanPengguna/DataPagination"
import useFetchAllPeminjamanPengguna from "@/hooks/fetchHooks/penggunaHooks/peminjaman/useFetchAllPeminjamanPengguna"

const PeminjamanPage = () => {

  const {data: dataPeminjaman, isLoading} = useFetchAllPeminjamanPengguna()
  console.log(dataPeminjaman)

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