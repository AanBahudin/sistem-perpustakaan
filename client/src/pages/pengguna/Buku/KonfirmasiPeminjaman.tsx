import { getDetailBuku } from "@/actions/BukuActions"
import { profileAction } from "@/actions/userActions"

import Container from "@/globals/Container"
import { useQueries } from "@tanstack/react-query"

import { useParams } from "react-router-dom"
import PeminjamanInfo from "./PeminjamanInfo"

import KonfirmasiData from "./KonfirmasiData"
import { getPeminjamanByBookId } from "@/actions/peminjamanActions"
import FAQ from "./FAQ"

const KonfirmasiPeminjaman = () => {

  const {id} = useParams()
  const results = useQueries({
    queries: [
      {
        queryKey: ['profil'],
        queryFn: profileAction
      },
      {
        queryKey: ['confirm', 'peminjaman', id],
        queryFn: () => getDetailBuku(id as string)
      },
      {
        queryKey: ['confirm', 'pinjaman', id],
        queryFn: () => getPeminjamanByBookId(id as string)
      }
    ]
  })

  const [dataProfil, dataBuku, dataPeminjaman] = results
  const isLoading = results.some(q => q.isLoading) 
  if (isLoading) return <h1>Loading</h1>
  
  const {data:profil} = dataProfil
  const {data:detailBuku} = dataBuku.data

  return (
    <Container className="w-[80%] my-10 flex gap-x-6">
      <section className="w-2/3 flex flex-col">
        <PeminjamanInfo detailBuku={detailBuku} peminjaman={dataPeminjaman.data} />
        <FAQ />
      </section>
      <KonfirmasiData data={dataBuku.data} profil={profil} pinjaman={dataPeminjaman.data} />
    </Container>
  )
}

export default KonfirmasiPeminjaman