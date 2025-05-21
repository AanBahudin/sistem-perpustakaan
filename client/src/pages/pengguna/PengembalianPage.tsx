import {defer, useLoaderData} from 'react-router-dom'
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PengembalianTabs from '@/components/pengguna/PengembalianPengguna/PengembalianTabs'
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import AwaitHooks from "@/hooks/AwaitHooks"
import { getPengembalianData } from '@/actions/pengembalianActions'
import PengembalianSearch from '@/components/pengguna/PengembalianPengguna/PengembalianSearch'

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

      {/* GANTI DAN BUATKAN KOMPONEN BARU UNTUK PENGEMBALIAN */}
      {/* <PeminjamanSearch /> */}
      <PengembalianSearch />

      <AwaitHooks data={pengembalian} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PeminjamanDataLayout peminjamanData={data.data} />}
      </AwaitHooks>
    </main>
  )
}

export default PengembalianPage