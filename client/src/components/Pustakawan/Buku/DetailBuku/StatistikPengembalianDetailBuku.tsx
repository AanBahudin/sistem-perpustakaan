import Container from '@/globals/Container'
import GrafikDetailBuku from './GrafikDetailBuku'
import DetailBukuTabelPengembalian from './DetailBukuTabelPengembalian'

const StatistikPengembalianDetailBuku = ({data} : {data: any}) => {

  const { buku, dataStatsPengembalianBuku, dataPengembalian } = data

  return (
    <Container className='w-full my-4'>
      <GrafikDetailBuku dataBuku={buku} dataStatistik={dataStatsPengembalianBuku} judulStatistik={`Peminjaman ${buku.judul}`} />
      <DetailBukuTabelPengembalian dataBuku={dataPengembalian} />
    </Container>
  )
}

export default StatistikPengembalianDetailBuku