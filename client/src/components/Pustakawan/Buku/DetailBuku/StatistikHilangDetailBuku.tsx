import Container from "@/globals/Container"
import GrafikDetailBuku from "./GrafikDetailBuku"
import DetailBukuTabelKehilangan from "./DetailBukuTabelKehilangan"

const StatistikHilangDetailBuku = ({data} : {data: any}) => {

    const { buku, statsHilangBuku, bukuHilang } = data

    return (
        <Container className='w-full my-4'>
            <GrafikDetailBuku 
                dataBuku={buku} 
                dataStatistik={statsHilangBuku} 
                judulStatistik={`Kehilangan ${buku.judul}`}
                judulRasio='Total Buku Hilang'
                dataRasio={bukuHilang.length} />
            <DetailBukuTabelKehilangan dataBuku={bukuHilang} />
        </Container>
  )
}

export default StatistikHilangDetailBuku