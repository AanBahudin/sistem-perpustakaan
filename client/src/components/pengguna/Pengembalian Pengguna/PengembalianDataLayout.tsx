import { useSelector } from 'react-redux'
import PengembalianGrid from './PengembalianGrid'
import PengembalianList from './PengembalianList'

type PengembalianDataLayoutType = {
    pengembalianData: any
}

const PengembalianDataLayout = ({pengembalianData} : PengembalianDataLayoutType) => {

    const {layout} = useSelector((state: any) => state.peminjamanState)

    return (
        <>
            {layout === 'grid' && <PengembalianGrid data={pengembalianData} />}
            {layout === 'list' && <PengembalianList data={pengembalianData} />}
        </>
    )
}

export default PengembalianDataLayout