import { useSelector } from 'react-redux'
import PengembalianGrid from './PengembalianGrid'
import PengembalianList from './PengembalianList'

type PengembalianDataLayoutType = {
    pengembalianData: any,
    savedData: any,
    likedData: any
}

const PengembalianDataLayout = ({pengembalianData, likedData, savedData} : PengembalianDataLayoutType) => {

    const {layout} = useSelector((state: any) => state.peminjamanState)

    return (
        <>
            {layout === 'grid' && <PengembalianGrid data={pengembalianData} savedData={savedData} likedData={likedData} />}
            {layout === 'list' && <PengembalianList data={pengembalianData} />}
        </>
    )
}

export default PengembalianDataLayout