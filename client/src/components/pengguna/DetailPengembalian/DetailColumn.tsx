import { Separator } from '@/components/ui/separator'
import { 
  BukuReview, 
  PengembalianBookDescription, 
  ProfilePeminjamanContainer } from '.'

type DetailColumnType = {
  buku: any,
  peminjaman: any,
  profileData: any,
}

const DetailColumn = ({buku, peminjaman, profileData} : DetailColumnType) => {
  return (
    <section className='col-span-8 min-h-[80vh] border rounded-2xl p-6'>
      <BukuReview buku={buku} />
      <Separator className='my-4' />
      <PengembalianBookDescription deskripsi={buku.deskripsi} />
      <ProfilePeminjamanContainer 
        profileData={profileData} 
        peminjaman={peminjaman} />
    </section>  
  )
}

export default DetailColumn