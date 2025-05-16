import { setLayout } from '@/cart/peminjamanSlice'
import { store } from '@/store'
import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'

const ToggleLayout = () => {

    const {layout} = useSelector((state: any) => state.peminjamanState)

    const handleGrid = () => {
        store.dispatch(setLayout('grid'))
    }

    const handleList = () => {
        store.dispatch(setLayout('list'))
    }

    return (
        <main className="flex items-center gap-x-4">
            <LayoutGrid onClick={handleGrid} className={`${layout === 'grid' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8 ease-in-out duration-200`} />
            <StretchHorizontal onClick={handleList} className={`${layout === 'list' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8`} />
        </main>
    )
}

export default ToggleLayout