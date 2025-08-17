import { useSelector } from "react-redux"
import { store } from "@/store"
import { setPerpanjanganDetailTabsPustakawan } from "@/cart/perpanjanganSlice"

const DetailPerpanjanganTabs = () => {

    const menu = ['Pengajuan', 'Data peminjaman']
    const { perpanjanganDetailTabsPustakawan } = useSelector((state: any) => state.perpanjanganState)
    const handleChangeMenu = (value: string) => {
        store.dispatch(setPerpanjanganDetailTabsPustakawan(value))
    }

    return (
        <section className="w-full flex items-center justify-start gap-x-4 mb-3">
            {menu.map((item: string, index: number) => {
                const isActive = perpanjanganDetailTabsPustakawan === item
                return (
                    <p onClick={() => handleChangeMenu(item)} className={`text-xs duration-200 ease-in-out min-w-[160px] text-center ${isActive ? 'bg-muted' : 'border'} px-4 py-2 rounded cursor-default`}key={index}>{item}</p>
                )
            })}
        </section>
    )
}

export default DetailPerpanjanganTabs