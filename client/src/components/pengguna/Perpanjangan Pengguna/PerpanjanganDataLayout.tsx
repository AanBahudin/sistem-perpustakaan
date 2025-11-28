import { useSelector } from 'react-redux'
import { PerpanjanganListLayout, PerpanjanganGridLayout } from '.'

type PerpanjanganDataLayoutType = {
  data: any
}

const PerpanjanganDataLayout = ({data} : PerpanjanganDataLayoutType) => {

    const {layout} = useSelector((state:any) => state.peminjamanState)

    return (
        <>
            {layout === 'grid' && <PerpanjanganGridLayout data={data}/>}
            {layout === 'list' && <PerpanjanganListLayout data={data}/>}
        </>
    )
}

export default PerpanjanganDataLayout