import { tabsMenu } from "@/utils/constants"
import { store } from "@/store"
import { setTab } from "@/cart/peminjamanSlice"
import { useNavigate, useSearchParams } from "react-router-dom"

const PeminjamanTab = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams(); // ✅ ambil instance URLSearchParams
    const filter = searchParams.get('filter') || 'Semua';    

    const handleTabs = (data: any) => {
        const params = new URLSearchParams()
        store.dispatch(setTab(data))
        params.set('filter', data.title)
        navigate(`?${params.toString()}`);
    }

    return (
        <div className="w-full grid grid-cols-5 place-items-center gap-x-2 rounded-xl border">
            {tabsMenu.map(item => {
                return (
                <div key={item.id} onClick={() => handleTabs({id: item.id, title: item.title})} className={`${item.title === filter ? 'bg-muted text-primary-foreground' : ''} w-full cursor-default col-span-1 py-4 first:rounded-l last:rounded-l hover:text-primary-foreground duration-300 ease-in-out`}>
                    <h3 className="capitalize text-center">{item.title}</h3>
                </div>
                )
            })}
        </div>
    )
}

export default PeminjamanTab