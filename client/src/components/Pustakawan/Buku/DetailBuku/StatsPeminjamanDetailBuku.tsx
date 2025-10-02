import Container from '@/globals/Container'
import GrafikDetailBuku from './GrafikDetailBuku'
import DetailBukuTabelPeminjaman from './DetailBukuTabelPeminjaman'

const StatistikPeminjamanDetailBuku = ({data, untuk} : {data: any, untuk?: string}) => {

    const { buku, dataStatsBuku, peminjamanAktif } = data

    return (
        <Container className='w-full my-4'>
            <GrafikDetailBuku
                 dataBuku={buku} 
                 dataStatistik={dataStatsBuku} 
                 judulStatistik={`Peminjaman ${buku.judul}`}
                 judulRasio='Buku dalam peminjaman'
                 dataRasio={peminjamanAktif.length} />
            <DetailBukuTabelPeminjaman dataBuku={peminjamanAktif} untuk={untuk} />
        </Container>
    )
}

export default StatistikPeminjamanDetailBuku