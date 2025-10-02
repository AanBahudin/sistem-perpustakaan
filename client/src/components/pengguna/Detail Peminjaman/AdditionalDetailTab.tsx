import { setDetailPeminjamanTab } from "@/cart/peminjamanSlice"
import { store } from "@/store"
import { useEffect } from "react"
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
    tabs = tabs.filter(item => item !== type)

    useEffect(() => {
        store.dispatch(setDetailPeminjamanTab(tabs[0]))
    }, [])
    
    return (
        <section className="w-full flex items-center justify-center">
            {tabs.map((item: string, index: number) => {
                return (
                    <p onClick={() => handleActiveTab(item)} key={index} className={`flex-1 py-4 ${detailPeminjamanTab === item ? 'border-b-2 border-primary' : 'border-b-2 border-transparent'} text-center cursor-default duration-200 ease-in-out capitalize`}>{item}</p>
                )
            })}
        </section>
    )
}

export default AdditionalDetailTab