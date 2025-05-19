import { setLayout } from '@/cart/peminjamanSlice';
import { store } from '@/store';
import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const ToggleLayout = () => {
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const params = new URLSearchParams(searchParams); // clone existing query
    const layout = searchParams.get('layout') || 'grid';

    const handleLayout = (newLayout: string) => {
        params.set('layout', newLayout); // tambahkan / ganti layout
        navigate(`?${params.toString()}`); // update URL tanpa hapus query lain
        store.dispatch(setLayout(newLayout))
    }


    return (
        <main className="flex items-center gap-x-4">
            <LayoutGrid onClick={() => handleLayout('grid')} className={`${layout === 'grid' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8 ease-in-out duration-200`} />
            <StretchHorizontal onClick={() => handleLayout('list')} className={`${layout === 'list' ? 'bg-primary' : 'bg-transparent'} border p-1 rounded w-8 h-8`} />
        </main>
    )
}

export default ToggleLayout