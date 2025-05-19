import React from "react"
import { Suspense } from "react"
import { defer } from "react-router-dom"
import {Await, useLoaderData} from 'react-router-dom'
import PeminjamanSearch from "@/components/pengguna/peminjamanPengguna/PeminjamanSearch"
import PeminjamanTab from "@/components/pengguna/peminjamanPengguna/PeminjamanTab"
import { getPeminjamanData } from "@/actions/peminjamanActions"
import PeminjamanLoading from "@/components/pengguna/peminjamanPengguna/PeminjamanLoading"
import PeminjamanDataLayout from "@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout"

const LazyComponent = React.lazy(() => import('@/components/pengguna/peminjamanPengguna/PeminjamanDataLayout'))

export const peminjamanLoader = async() => {
  return defer({
    peminjaman: getPeminjamanData()
  })
}

const PeminjamanPage = () => {

  const {peminjaman} = useLoaderData() as { peminjaman: Promise<any> }

  return (
    <main className="col-span-9">
      <PeminjamanTab  />
      <PeminjamanSearch />
      <Suspense fallback={<PeminjamanLoading />}>
        <Await resolve={peminjaman}>
          {(data) => <PeminjamanDataLayout peminjamanData={data.data} />}
        </Await>
      </Suspense>
    </main>
  )
}

export default PeminjamanPage 