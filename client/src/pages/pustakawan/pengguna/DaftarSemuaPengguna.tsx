import GrafikPertumbuhanSemuaPengguna from '@/components/Pustakawan/Pengguna/SemuaPengguna/GrafikPertumbuhanSemuaPengguna'
import SemuaPenggunaFilter from '@/components/Pustakawan/Pengguna/SemuaPengguna/SemuaPenggunaFilter'
import Container from '@/globals/Container'

const DaftarSemuaPengguna = () => {
  return (
    <Container className='w-full'>
      <GrafikPertumbuhanSemuaPengguna />
      <SemuaPenggunaFilter />
    </Container>
  )
}

export default DaftarSemuaPengguna