import React from "react"
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import { Suspense } from "react"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"

const LazyComponent = React.lazy(() => import('@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout'))

export const peminjamanLoader = async() => {
  const response = await getPeminjamanData()
  return response
}

const PeminjamanPage = () => {
  return (
    <main className="col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />
      <Suspense fallback={<PeminjamanLoading />}>
        {/* <PeminjamanDataLayout /> */}
        <LazyComponent />
      </Suspense>
    </main>
  )
}

export default PeminjamanPage 