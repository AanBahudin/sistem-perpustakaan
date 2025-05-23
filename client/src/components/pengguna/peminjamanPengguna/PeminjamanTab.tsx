import { tabsMenu } from "@/utils/constants"
import { store } from "@/store"
import { setFilter, setTab } from "@/cart/peminjamanSlice"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const PeminjamanTab = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams(); // ✅ ambil instance URLSearchParams
    const filter = searchParams.get('statusPeminjaman') || 'Semua';
    
    const handleTabs = (data: any) => {
        const params = new URLSearchParams(searchParams)
        store.dispatch(setTab(data))
        if (data.filter) {
            params.set('statusPeminjaman', data.filter)
        } else {
            params.delete('statusPeminjaman')
        }
        navigate(`?${params.toString()}`);
    }
    
    useEffect(() => {
        if (!filter) {
            store.dispatch(setFilter('Semua'))
        } else {
            store.dispatch(setFilter(filter))
        }
    }, [])

    return (
        <div className="w-full grid grid-cols-5 place-items-center gap-x-2 rounded-xl border">
            {tabsMenu.map(item => {
                return (
                <div key={item.id} onClick={() => handleTabs({id: item.id, filter: item.filter})} className={`${item.title === filter ? 'bg-muted text-primary dark:text-primary-foreground' : ''} w-full cursor-default col-span-1 py-4 first:rounded-l last:rounded-l hover:text-primary dark:hover:text-primary-foreground duration-300 ease-in-out`}>
                    <h3 className="capitalize text-center">{item.title}</h3>
                </div>
                )
            })}
        </div>
    )
}

export default PeminjamanTab