import PustakawanBreadCrumbs from "@/components/Pustakawan/PustakawanBreadCrumbs"
import GrafikBukuContainer from "@/components/Pustakawan/Buku/GrafikBukuContainer"
import Container from "@/globals/Container"
import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router-dom"
import { prodiGetAllBukuAction } from "@/actions/Prodi/Buku"
import SemuaBukuFilter from "@/components/Pustakawan/Buku/SemuaBukuFilter"
import BukuLoading from "@/components/Pustakawan/Buku/BukuLoading"
import { ImageOff } from "lucide-react"
import DataPagination from "@/components/pengguna/peminjaman Pengguna/DataPagination"


const ProdiSemuaBukuPage = () => {

  const [searchParams] = useSearchParams()
  const params = new URLSearchParams(searchParams).toString()

  const {data, isLoading} = useQuery({
    queryKey: ['semua', 'buku', params],
    queryFn: () => prodiGetAllBukuAction(params)
  })

  if (isLoading) return <BukuLoading />

  const { dataBuku, dataRasio, dataStats, totalPage } = data

  return (
    <Container className="w-full">
      <PustakawanBreadCrumbs />

      <GrafikBukuContainer 
        dataRasio={dataRasio}
        dataStatistik={dataStats}
        judulStatistik='Statistik Penambahan Buku Bulanan'
        judulRasio='Rasio Kategori Terbanyak'
        labelDataRasio={[]}
        type="Semua"
      />
      <SemuaBukuFilter />

      <ProdiBookContainer dataBuku={dataBuku} />
      <DataPagination totalPage={totalPage} />

    </Container>
  )
}

const ProdiBookContainer = ({dataBuku} : {dataBuku: any}) => {
  return (
    <section className="w-full grid grid-cols-5 gap-4">
      {dataBuku.map((item: any, index: number) => {
        return (
          <ProdiBookCard key={index} buku={item} />
        )
      })}
    </section>
  )
}

const ProdiBookCard = ({buku} : {buku: any}) => {
  return (
    <Link to={`detail/${buku._id}`} className="w-full border p-4 rounded-xl bg-accent/40">
      {buku.cover ? (
        <img className="w-[200px] h-[200px] hover:scale-105 overflow-hidden duration-200 ease-in-out rounded-lg object-cover object-top mb-4" src={buku.cover} alt={buku.judul} />
      ) : (
        <div className="w-[200px] h-[200px] border rounded-lg mb-4 flex items-center justify-center"> <ImageOff /> </div>
      )}
      <h1 className="text-sm font-semibold hover:underline duration-200 ease-in-out cursor-default">{buku.judul}</h1>
      <p className="text-xs mt-1.5">{buku.penulis}</p>
    </Link>
  )
}

export default ProdiSemuaBukuPage