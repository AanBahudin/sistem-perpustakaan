import Container from '@/globals/Container'

import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getDetailPeminjaman, getPeminjamanData } from '@/actions/peminjamanActions'

import { getPengembalianData } from '@/actions/pengembalianActions'
import { getPerpanjangan } from '@/actions/perpanjanganActions'
import DetailPeminjamanContainer from '@/components/pengguna/Detail Peminjaman/DetailPeminjamanContainer'
import { getDetailBuku } from '@/actions/BukuActions'
import DetailBookLoading from '@/components/Loading/DetailBookLoading'


const PeminjamanDetailPage = () => {

  const {id, idBuku} = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['peminjaman', ''],
        queryFn: () =>  getPeminjamanData('')
      },
      {
        queryKey: ['detail-peminjaman', id],
        queryFn: () => getDetailPeminjaman(id!)
      },
      {
        queryKey: ['detail-book', idBuku],
        queryFn: () => getDetailBuku(idBuku!)
      },
      {
        queryKey:['pengembalian', id],
        queryFn: () => getPengembalianData(`idPeminjaman=${id}`)
      },
      {
        queryKey: ['perpanjangan', id],
        queryFn: () => getPerpanjangan(`idPeminjaman=${id}`)
      }
    ]
  }) 

  const [semuaPeminjaman, detailPeminjaman, detailBuku, dataPengembalian, dataPerpanjangan] = results
  const isLoading = results.some(q => q.isLoading)

  return (
    <Container className='my-20 mx-auto'>
      {isLoading ? <DetailBookLoading /> : (
        <DetailPeminjamanContainer
          semuaPeminjaman={semuaPeminjaman.data.data}
          detailBuku={detailBuku.data}
          peminjaman={detailPeminjaman.data} 
          pengembalian={dataPengembalian.data} 
          perpanjangan={dataPerpanjangan.data} />
      )}

    </Container>
  )
}

export default PeminjamanDetailPage