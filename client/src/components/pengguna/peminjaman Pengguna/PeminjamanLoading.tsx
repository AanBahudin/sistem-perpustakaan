import GridLoading from './GridLoading'
import ListLoading from './ListLoading'
import { useSearchParams } from 'react-router-dom'

const PeminjamanLoading = () => {

    const [searchParams] = useSearchParams(); // ✅ ambil instance URLSearchParams
    const layout = searchParams.get('layout') || 'grid';

    return (
        <>
            {layout === 'grid' ? <GridLoading /> : <ListLoading />}
        </>
    )
}

export default PeminjamanLoading