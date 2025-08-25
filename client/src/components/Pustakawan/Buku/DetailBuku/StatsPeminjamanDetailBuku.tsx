import Container from '@/globals/Container'
import GrafikDetailBuku from './GrafikDetailBuku'
import DetailBukuTabelPeminjaman from './DetailBukuTabelPeminjaman'

const StatistikPeminjamanDetailBuku = ({data} : {data: any}) => {

    const { buku, dataStatsBuku, peminjamanAktif } = data

    return (
        <Container className='w-full my-4'>
            <GrafikDetailBuku dataBuku={buku} dataStatistik={dataStatsBuku} judulStatistik={`Peminjaman ${buku.judul}`} />
            <DetailBukuTabelPeminjaman dataBuku={peminjamanAktif} />
        </Container>
    )
}

export default StatistikPeminjamanDetailBuku