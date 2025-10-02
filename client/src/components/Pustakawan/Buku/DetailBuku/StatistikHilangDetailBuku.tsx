import Container from "@/globals/Container"
import GrafikDetailBuku from "./GrafikDetailBuku"
import DetailBukuTabelKehilangan from "./DetailBukuTabelKehilangan"

const StatistikHilangDetailBuku = ({data, untuk} : {data: any, untuk?: string}) => {

    const { buku, statsHilangBuku, bukuHilang } = data

    return (
        <Container className='w-full my-4'>
            <GrafikDetailBuku 
                dataBuku={buku} 
                dataStatistik={statsHilangBuku} 
                judulStatistik={`Kehilangan ${buku.judul}`}
                judulRasio='Total Buku Hilang'
                dataRasio={bukuHilang.length} />
            <DetailBukuTabelKehilangan dataBuku={bukuHilang} untuk={untuk} />
        </Container>
  )
}

export default StatistikHilangDetailBuku