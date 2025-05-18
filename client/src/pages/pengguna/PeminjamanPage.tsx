import { useSelector } from "react-redux"
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import { useLoaderData } from "react-router-dom"

export const peminjamanLoader = async() => {
  const response = await getPeminjamanData()
  return response
}

const PeminjamanPage = () => {
  // const {data, page, total} = useLoaderData()

  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <main className="col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />
      <PeminjamanDataLayout layout={layout} />
    </main>
  )
}

export default PeminjamanPage 