import { setTab } from "@/cart/dashboardSlice"
import { store } from "@/store"
import { useSelector } from "react-redux"

const TableTabs = () => {

    const tabsValue = ['peminjaman', 'perpanjangan', 'pengembalian', 'deadline', 'hilang']
    const {activeTab} = useSelector((state:any) => state.dashboardState)

    const handleTab = (value: string) => {
        store.dispatch(setTab(value))
    }

    return (
        <section className="flex items-center gap-x-6">
            {tabsValue.map(item => {
                return (
                    <h5 key={item} onClick={() => handleTab(item)} className={`capitalize ease-in-out duration-200 font-semibold text-sm cursor-default border-b-2 w-fit pb-2 pr-24 ${activeTab === item ? 'border-primary text-primary' : 'border-transparent'}`}>{item}</h5>
                )
            })}
        </section>
    )
}

export default TableTabs