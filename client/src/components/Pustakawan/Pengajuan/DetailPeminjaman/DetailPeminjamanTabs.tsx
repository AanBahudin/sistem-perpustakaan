import { useSelector } from "react-redux"
import { store } from "@/store"
import { setDetailPeminjamanActiveTabs } from "@/cart/peminjamanSlice"

type DetailPeminjamanTabsType = {
    idPengembalian?: string,
    peminjaman: any
}

const DetailPeminjamanTabs = ({idPengembalian, peminjaman} : DetailPeminjamanTabsType) => {

    const { statusPeminjaman } = peminjaman

    const { pustakawanDetailPeminjamanActiveTabs } = useSelector((state: any) => state.peminjamanState)
    const handleChangeMenu = (value: string) => {
        store.dispatch(setDetailPeminjamanActiveTabs(value))
    }
    
    const isPeminjamanActive = pustakawanDetailPeminjamanActiveTabs === 'Peminjaman'

    const isPengembalianExist = pustakawanDetailPeminjamanActiveTabs === 'Data Pengembalian'
    const isPengembalianNotExists = pustakawanDetailPeminjamanActiveTabs === 'Buat Pengembalian'
    
    const showPengembalianDataTerms = statusPeminjaman === 'Dikembalikan' && idPengembalian

    const allowedStatusPeminjamanToCreatePengembalian = ['Dipinjam', 'Terlambat']
    const showCreatePengembalian = !idPengembalian && allowedStatusPeminjamanToCreatePengembalian.includes(statusPeminjaman)

    return (
        <section className="w-full flex items-center justify-start gap-x-2 mb-3">
            <p onClick={() => handleChangeMenu('Peminjaman')} className={`text-xs duration-200 ease-in-out min-w-[160px] text-center ${isPeminjamanActive ? 'bg-muted' : 'border'} px-4 py-2 rounded-lg cursor-default`}>Peminjaman</p>

            {showPengembalianDataTerms && (
                <p onClick={() => handleChangeMenu('Data Pengembalian')} className={`text-xs duration-200 ease-in-out min-w-[160px] text-center ${isPengembalianExist ? 'bg-muted' : 'border'} px-4 py-2 rounded-lg cursor-default`}>Data Pengembalian</p>
            )}

            {showCreatePengembalian && (
                <p onClick={() => handleChangeMenu('Buat Pengembalian')} className={`text-xs duration-200 ease-in-out min-w-[160px] text-center ${isPengembalianNotExists ? 'bg-muted' : 'border'} px-4 py-2 rounded-lg cursor-default`}>Buat Pengembalian</p>
            )}
        </section>
    )
}

export default DetailPeminjamanTabs