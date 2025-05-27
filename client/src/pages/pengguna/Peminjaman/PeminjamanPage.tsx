import { defer } from "react-router-dom"
import {useLoaderData} from 'react-router-dom'
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import AwaitHooks from "@/hooks/AwaitHooks"
import { getAllSimpanan } from "@/actions/simpanActions"
import { getAllSuka } from "@/actions/sukaActions"

export const peminjamanLoader = async({request} : {request: Request}) => {
  
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString() 
  
  return defer({
    peminjaman: getPeminjamanData(searchParams),
    tersimpan: getAllSimpanan(),
    disukai: getAllSuka()
  })
}

const PeminjamanPage = () => {

  const {peminjaman, tersimpan, disukai} = useLoaderData() as { peminjaman: Promise<any>, tersimpan: Promise<any>, disukai: Promise<any> }
  const semuaData = Promise.all([peminjaman, disukai, tersimpan])
  

  return (
    <main className="min-h-[90vh] col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />

      <AwaitHooks data={semuaData} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PeminjamanDataLayout peminjamanData={data[0].data} likedData={data[1].bukuDisukai} savedData={data[2].bukuDisimpan}  />}
      </AwaitHooks>
    </main>
  ) 
}

export default PeminjamanPage 