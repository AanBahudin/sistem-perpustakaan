import { setActiveTab } from '@/cart/pengembalianSlice'
import { store } from '@/store'
import { tabPengembalian } from '@/utils/constants'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const PengembalianTabs = () => {

    const {activeTab} = useSelector((state:any) => state.pengembalianState)
    const [searchParams] = useSearchParams(); // ✅ ambil instance URLSearchParams
    const filter = searchParams.get('statusPembayaran') || 'Semua';

    const handleTab = (activeTab: string) => {
        store.dispatch(setActiveTab(activeTab))
    }

    useEffect(() => {
        if (filter) {
            store.dispatch(setActiveTab(filter))
        } else {
            store.dispatch(setActiveTab('Semua'))
        }
    }, [])

    return (
        <div className="w-full grid grid-cols-3 place-items-center gap-x-2 rounded-xl border">
            {tabPengembalian.map((item, index) => {
                return (
                <div onClick={() => handleTab(item.title)} key={index} className={`${activeTab === item.title ? 'bg-muted text-primary-foreground' : ''} w-full cursor-default col-span-1 py-4 first:rounded-l last:rounded-l hover:text-primary-foreground duration-300 ease-in-out`}>
                    <h3 className="capitalize text-center">{item.title}</h3>
                </div>
                )
            })}
        </div>
    )
}

export default PengembalianTabs