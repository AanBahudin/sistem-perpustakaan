import { useSelector } from "react-redux"
import AdditionalDetailTab from "./AdditionalDetailTab"
import DataContainer from "./DataContainer"
import PeminjamanList from "../peminjaman Pengguna/PeminjamanList"
import ListPengembalian from "./ListPengembalian"
import ListPerpanjangan from "./ListPerpanjangan"

type AdditionalDetailType = {
  pengembalian?: any,
  perpanjangan?: any,
  peminjaman?: any
}

const AdditionalDetail = ({pengembalian, perpanjangan, peminjaman} : AdditionalDetailType) => {


  const {detailPeminjamanTab} = useSelector((state:any) => state.peminjamanState)

  return (
    <section className='col-span-9 w-full border rounded-2xl p-4'>
      <AdditionalDetailTab />

      <DataContainer>
        {detailPeminjamanTab === 'pengembalian' && <ListPengembalian data={pengembalian} />}
        {detailPeminjamanTab === 'perpanjangan' && <ListPerpanjangan data={perpanjangan} />}
        {detailPeminjamanTab === 'peminjaman' && <PeminjamanList data={peminjaman} />}
      </DataContainer>
      
    </section>
  )
}

export default AdditionalDetail