import { useSelector } from "react-redux"
import { store } from "@/store"
import { setPustakawanPengembalianTab } from "@/cart/pengembalianSlice"

const DetailPengembalianTabs = () => {

    const menu = ['Pengajuan', 'Data peminjaman']
    const { pustakawanPengembalianTab } = useSelector((state: any) => state.pengembalianState)
    const handleChangeMenu = (value: string) => {
        store.dispatch(setPustakawanPengembalianTab(value))
    }

    return (
        <section className="w-full flex items-center justify-start gap-x-2 mb-3">
            {menu.map((item: string, index: number) => {
                const isActive = pustakawanPengembalianTab === item
                return (
                    <p onClick={() => handleChangeMenu(item)} className={`text-xs duration-200 ease-in-out min-w-[160px] text-center ${isActive ? 'bg-muted' : 'border'} px-4 py-2 rounded-lg cursor-default`}key={index}>{item}</p>
                )
            })}
        </section>
    )
}

export default DetailPengembalianTabs