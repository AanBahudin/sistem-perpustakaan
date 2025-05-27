import {defer, useLoaderData} from 'react-router-dom'
import PengembalianTabs from '@/components/pengguna/PengembalianPengguna/PengembalianTabs'
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import AwaitHooks from "@/hooks/AwaitHooks"
import { getPengembalianData } from '@/actions/pengembalianActions'
import PengembalianSearch from '@/components/pengguna/PengembalianPengguna/PengembalianSearch'
import PengembalianDataLayout from '@/components/pengguna/PengembalianPengguna/PengembalianDataLayout'
import { getAllSimpanan } from '@/actions/simpanActions'
import { getAllSuka } from '@/actions/sukaActions'

export const pengembalianLoader = async({request} : {request: Request}) => {
  const url  = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    pengembalian: getPengembalianData(searchParams),
    tersimpan: getAllSimpanan(),
    disukai: getAllSuka()
  })
}

const PengembalianPage = () => {

  const {pengembalian, tersimpan, disukai} = useLoaderData() as { pengembalian: Promise<any>, tersimpan: Promise<any>, disukai: Promise<any> }
   const semuaData = Promise.all([pengembalian, disukai, tersimpan])

  return (
    <main className="col-span-9">
      <PengembalianTabs  />
      <PengembalianSearch />

      <AwaitHooks data={semuaData} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PengembalianDataLayout pengembalianData={data[0].data} likedData={data[1].bukuDisukai} savedData={data[2].bukuDisimpan}  />}
      </AwaitHooks>
    </main>
  )
}

export default PengembalianPage