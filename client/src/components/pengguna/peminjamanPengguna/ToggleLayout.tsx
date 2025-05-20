import { setLayout } from '@/cart/peminjamanSlice';
import { store } from '@/store';
import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';

const ToggleLayout = () => {

    const {layout} = useSelector((state:any) => state.peminjamanState)
    
    const handleLayout = (newLayout: string) => {
        store.dispatch(setLayout(newLayout))
        localStorage.setItem('layout', newLayout)
    }

    return (
        <main className="flex items-center gap-x-4">
            <LayoutGrid onClick={() => handleLayout('grid')} className={`${layout === 'grid' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8 ease-in-out duration-200`} />
            <StretchHorizontal onClick={() => handleLayout('list')} className={`${layout === 'list' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8`} />
        </main>
    )
}

export default ToggleLayout