import { getAllBukuPustakawan } from "@/actions/Pustakawan/pustakawanBukuActions"
import GrafikPengajuanContainer from "@/components/Pustakawan/Pengajuan/GrafikPengajuanContainer"
import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"


const PustakawanSemuaBukuPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'buku'],
    queryFn: () => getAllBukuPustakawan({query: params})
  })

  if (isLoading) return <h1>Loading ... </h1>
  console.log(data)

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />
      {/* <GrafikPengajuanContainer 
        dataRasio={rasioStatusPeminjaman}
        dataStatistik={statsPeminjaman}
        judulStatistik='Statistik Pertumbuhan Peminjaman Bulanan'
        judulRasio='Rasio Status Peminjaman'
        labelDataRasio={['Dipinjam', 'Dikembalikan', 'Terlambat', 'Diajukan', 'Ditolak']}
      /> */}
    </Container>
  )
}

export default PustakawanSemuaBukuPage