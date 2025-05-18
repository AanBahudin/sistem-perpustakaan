import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"
import { getPeminjamanData } from "@/actions/peminjamanActions"

export const peminjamanLoader = async() => {
  const response = await getPeminjamanData()
  return response
}

const PeminjamanPage = () => {
  return (
    <main className="col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />
      <PeminjamanDataLayout />
    </main>
  )
}

export default PeminjamanPage 