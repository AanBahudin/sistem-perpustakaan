import { useSelector } from "react-redux"
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"

const PeminjamanPage = () => {

  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <main className="col-span-9">
      <PeminjamanTab />
      <PeminjamanSearch />
      <PeminjamanDataLayout layout={layout} />
    </main>
  )
}

export default PeminjamanPage 