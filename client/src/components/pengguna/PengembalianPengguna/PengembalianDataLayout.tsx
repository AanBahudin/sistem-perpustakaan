import React from 'react'
import { useSelector } from 'react-redux'
import PengembalianGrid from './PengembalianGrid'
import PengembalianList from './PengembalianList'

const PengembalianDataLayout = ({pengembalianData} : {pengembalianData: any}) => {

    const {layout} = useSelector((state: any) => state.pengembalianState)

    return (
        <>
            {layout === 'grid' && <PengembalianGrid data={pengembalianData} />}
            {layout === 'list' && <PengembalianList data={pengembalianData} />}
        </>
    )
}

export default PengembalianDataLayout