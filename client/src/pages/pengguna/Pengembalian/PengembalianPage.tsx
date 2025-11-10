import {useSearchParams} from 'react-router-dom'
import PengembalianTabs from '@/components/pengguna/Pengembalian Pengguna/PengembalianTabs'
import PeminjamanLoading from "@/components/pengguna/peminjaman Pengguna/PeminjamanLoading"
import { getPengembalianData } from '@/actions/pengembalianActions'
import PengembalianSearch from '@/components/pengguna/Pengembalian Pengguna/PengembalianSearch'
import PengembalianDataLayout from '@/components/pengguna/Pengembalian Pengguna/PengembalianDataLayout'
import { useQuery } from '@tanstack/react-query'
import DataPagination from '@/components/pengguna/peminjaman Pengguna/DataPagination'

const PengembalianPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data: pengembalianData, isLoading} = useQuery({
    queryKey:['pengembalian', params],
    queryFn: () => getPengembalianData(params)
  })

  return (
    <main className="min-h-[80vh] col-span-9">
      <PengembalianTabs  />
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