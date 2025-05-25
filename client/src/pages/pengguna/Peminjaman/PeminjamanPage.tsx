import { defer } from "react-router-dom"
import {useLoaderData} from 'react-router-dom'
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import AwaitHooks from "@/hooks/AwaitHooks"

export const peminjamanLoader = async({request} : {request: Request}) => {
  
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString() 
  
  return defer({
    peminjaman: getPeminjamanData(searchParams)
  })
}

const PeminjamanPage = () => {

  const {peminjaman} = useLoaderData() as { peminjaman: Promise<any> }
  console.log(peminjaman);
  

  return (
    <main className="min-h-[90vh] col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />

      <AwaitHooks data={peminjaman} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PeminjamanDataLayout peminjamanData={data.data} />}
      </AwaitHooks>
    </main>
  ) 
}

export default PeminjamanPage 