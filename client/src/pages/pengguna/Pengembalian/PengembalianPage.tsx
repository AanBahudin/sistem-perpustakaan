import {defer, useLoaderData} from 'react-router-dom'
import PengembalianTabs from '@/components/pengguna/PengembalianPengguna/PengembalianTabs'
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import AwaitHooks from "@/hooks/AwaitHooks"
import { getPengembalianData } from '@/actions/pengembalianActions'
import PengembalianSearch from '@/components/pengguna/PengembalianPengguna/PengembalianSearch'
import PengembalianDataLayout from '@/components/pengguna/PengembalianPengguna/PengembalianDataLayout'

export const pengembalianLoader = async({request} : {request: Request}) => {
  const url  = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    pengembalian: getPengembalianData(searchParams)
  })
}

const PengembalianPage = () => {

  const {pengembalian} = useLoaderData() as { pengembalian: Promise<any> }

  return (
    <main className="col-span-9">
      <PengembalianTabs  />
      <PengembalianSearch />

      <AwaitHooks data={pengembalian} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PengembalianDataLayout pengembalianData={data.data} />}
      </AwaitHooks>
    </main>
  )
}

export default PengembalianPage