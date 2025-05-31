import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

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
      
      {isLoading ? <PeminjamanLoading /> : <PeminjamanDataLayout peminjamanData={dataPeminjaman.data} />}
      
    </main>
  ) 
}

export default PeminjamanPage 