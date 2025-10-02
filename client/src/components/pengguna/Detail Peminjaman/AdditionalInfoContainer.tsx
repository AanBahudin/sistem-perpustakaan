import AdditionalDetail from "./AdditionalDetail"
import OtherData from "./OtherData"

type AdditionalInfoContainerType = {
  pengembalian?: any,
  perpanjangan?: any,
  peminjaman?: any,
  semuaPeminjaman?: any,
}

const AdditionalInfoContainer = ({ pengembalian, perpanjangan, peminjaman, semuaPeminjaman } : AdditionalInfoContainerType) => {

  return (
    <section className='w-full min-h-[70vh] grid grid-cols-12 p-4 gap-x-8'>
        <AdditionalDetail pengembalian={pengembalian} peminjaman={peminjaman} perpanjangan={perpanjangan} />
        <OtherData semuaPeminjaman={semuaPeminjaman} currentIdBuku={peminjaman.buku._id} />
    </section>
  )
}

export default AdditionalInfoContainer