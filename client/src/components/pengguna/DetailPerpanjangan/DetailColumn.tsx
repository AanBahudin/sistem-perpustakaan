import { Separator } from "@/components/ui/separator"
import ProductReview from "../DetailPengembalian/ProductReview"
import BookDescription from "../DetailPengembalian/BookDescription"
import ProfilePeminjamanContainer from "../DetailPengembalian/ProfilePeminjamanContainer"

type DetailColumnType = {
    detailBuku: any,
    profil: any,
    peminjaman?: any
}

const DetailColumn = ({detailBuku, profil, peminjaman} : DetailColumnType) => {
  return (
    <section className='col-span-8 min-h-[80vh] border rounded-2xl p-6'>
        <ProductReview buku={detailBuku} />
        <Separator className="my-4" />
        <BookDescription deskripsi={detailBuku.deskripsi} />
        <ProfilePeminjamanContainer profileData={profil} peminjaman={peminjaman} />
    </section>
  )
}

export default DetailColumn