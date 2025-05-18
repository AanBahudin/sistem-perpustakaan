import { tabsMenu } from "@/utils/constants"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { setTab } from "@/cart/peminjamanSlice"

const PeminjamanTab = () => {

    const {activeTab} = useSelector((state:any) => state.peminjamanState)
    const handleTabs = (data: any) => {
        store.dispatch(setTab(data))
    }
    return (
        <div className="w-full grid grid-cols-5 place-items-center gap-x-2 rounded-xl border">
            {tabsMenu.map(item => {
                return (
                <div key={item.id} onClick={() => handleTabs({id: item.id, title: item.title})} className={`${item.id === activeTab ? 'bg-muted text-primary-foreground' : ''} w-full cursor-default col-span-1 py-4 first:rounded-l last:rounded-l hover:text-primary-foreground duration-300 ease-in-out`}>
                    <h3 className="capitalize text-center">{item.title}</h3>
                </div>
                )
            })}
        </div>
    )
}

export default PeminjamanTab