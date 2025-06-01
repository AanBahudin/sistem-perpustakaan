import { setDetailPeminjamanTab } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

const AdditionalDetailTab = () => {

    const {pathname} = useLocation()
    const type = pathname.split('/')[2]
    const {detailPeminjamanTab} = useSelector((state:any) => state.peminjamanState)
    const handleActiveTab = (value: string) => {
        store.dispatch(setDetailPeminjamanTab(value))
    }


    let tabs = ['peminjaman', 'pengembalian', 'perpanjangan']
    
    return (
        <section className="w-full flex items-center justify-center rounded">
            {tabs.map((item: string, index: number) => {
                if (type !== item) return (
                    <p onClick={() => handleActiveTab(item)} key={index} className={`flex-1 py-4 ${detailPeminjamanTab === item ? 'bg-secondary' : 'hover:bg-secondary/50'} rounded text-center duration-200 ease-in-out capitalize`}>{item}</p>
                )
            })}
        </section>
    )
}

export default AdditionalDetailTab