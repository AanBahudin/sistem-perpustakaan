import {
  PerpanjanganDetailColum,
  PerpanjanganColumn
} from '@/components/pengguna/DetailPerpanjangan'

type DetailPerpanjanganType = {
    detailPerpanjangan: any,
    detailBuku: any,
    profil: any,
    peminjaman: any
}

const DetailPerpanjangan = ({detailBuku, detailPerpanjangan, profil, peminjaman} : DetailPerpanjanganType) => {
  return (
    <section className='w-full grid grid-cols-12 gap-x-4 mt-10'>
      <PerpanjanganDetailColum detailBuku={detailBuku} profil={profil} peminjaman={peminjaman}/>
      <PerpanjanganColumn peminjaman={peminjaman} perpanjangan={detailPerpanjangan} />
    </section>
  )
}

export default DetailPerpanjangan