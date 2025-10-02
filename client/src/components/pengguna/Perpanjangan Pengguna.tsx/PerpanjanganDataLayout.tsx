import { useSelector } from 'react-redux'
import PerpanjanganGrid from './PerpanjanganGrid'
import PerpanjanganList from './PerpanjanganList'

type PerpanjanganDataLayoutType = {
  data: any
}

const PerpanjanganDataLayout = ({data} : PerpanjanganDataLayoutType) => {

    const {layout} = useSelector((state:any) => state.peminjamanState)

    return (
        <>
            {layout === 'grid' && <PerpanjanganGrid data={data}/>}
            {layout === 'list' && <PerpanjanganList data={data}/>}
        </>
    )
}

export default PerpanjanganDataLayout