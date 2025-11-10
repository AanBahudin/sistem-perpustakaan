import PeminjamanSearch from "@/components/pengguna/peminjaman Pengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjaman Pengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import PeminjamanLoading from "@/components/pengguna/peminjaman Pengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjaman Pengguna/PeminjamanDataLayout"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import DataPagination from "@/components/pengguna/peminjaman Pengguna/DataPagination"

const PeminjamanPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data: dataPeminjaman, isLoading} = useQuery({
    queryKey: ['peminjaman', params],
    queryFn: () => getPeminjamanData(params || '')
  })

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