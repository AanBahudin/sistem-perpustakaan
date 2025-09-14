import { prodiBerandaData } from '@/actions/Prodi/prodiBerandaActions'
import GrafikBukuContainer from '@/components/Pustakawan/Buku/GrafikBukuContainer'
import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import Container from '@/globals/Container'
import { useQuery } from '@tanstack/react-query'

const ProdiBerandaPage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['prodi', 'beranda'],
    queryFn: prodiBerandaData
  })

  if (isLoading) return <h1>Loading ....</h1>
  const { pengguna, buku } = data

  return (
    <Container className='w-full flex flex-col gap-y-6'>
      <GrafikBukuContainer
        dataRasio={buku.dataRasio}
        dataStatistik={buku.dataStats}
        judulStatistik='Statistik Penambahan Buku Bulanan'
        judulRasio='Rasio Kategori Terbanyak'
        labelDataRasio={[]}
        type="Semua"
      />
      <GrafikPertumbuhanSemuaPengguna monthlyUserGrowData={pengguna.monthlyUserGrowth} userAccountStatusRatio={pengguna.userAccountStatusRatio}/>
    </Container>
  )
}

export default ProdiBerandaPage