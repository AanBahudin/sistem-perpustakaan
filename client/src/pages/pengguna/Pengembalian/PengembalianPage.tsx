import {useSearchParams} from 'react-router-dom'
import PengembalianTabs from '@/components/pengguna/PengembalianPengguna/PengembalianTabs'
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import { getPengembalianData } from '@/actions/pengembalianActions'
import PengembalianSearch from '@/components/pengguna/PengembalianPengguna/PengembalianSearch'
import PengembalianDataLayout from '@/components/pengguna/PengembalianPengguna/PengembalianDataLayout'
import { useQuery } from '@tanstack/react-query'

const PengembalianPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data: pengembalianData, isLoading} = useQuery({
    queryKey:['pengembalian', params],
    queryFn: () => getPengembalianData(params)
  })

  return (
    <main className="col-span-9">
      <PengembalianTabs  />
      <PengembalianSearch />

      {isLoading ? <PeminjamanLoading /> : <PengembalianDataLayout pengembalianData={pengembalianData.data} />}
    </main>
  )
}

export default PengembalianPage