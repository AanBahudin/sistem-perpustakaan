import { useSelector } from "react-redux"
import PengembalianList from "../PengembalianPengguna/PengembalianList"
import PerpanjanganList from "../PerpanjanganPengguna.tsx/PerpanjanganList"
import AdditionalDetailTab from "./AdditionalDetailTab"
import DataContainer from "./DataContainer"
import PeminjamanList from "../peminjamanPengguna/PeminjamanList"

type AdditionalDetailType = {
  pengembalian?: any,
  perpanjangan?: any,
  peminjaman?: any
}

const AdditionalDetail = ({pengembalian, perpanjangan, peminjaman} : AdditionalDetailType) => {


  const {detailPeminjamanTab} = useSelector((state:any) => state.peminjamanState)

  return (
    <section className='col-span-9 w-full'>
      <AdditionalDetailTab />

      <DataContainer>
        {detailPeminjamanTab === 'pengembalian' && <PengembalianList data={pengembalian} />}
        {detailPeminjamanTab === 'perpanjangan' && <PerpanjanganList data={perpanjangan} />}
        {detailPeminjamanTab === 'peminjaman' && <PeminjamanList data={peminjaman} />}
      </DataContainer>
      
    </section>
  )
}

export default AdditionalDetail