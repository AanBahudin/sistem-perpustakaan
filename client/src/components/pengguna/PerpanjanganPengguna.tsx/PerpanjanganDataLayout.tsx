import { useSelector } from 'react-redux'
import PerpanjanganGrid from './PerpanjanganGrid'
import PerpanjanganList from './PerpanjanganList'

type PerpanjanganDataLayoutType = {
  data: any,
  savedData: any,
  likedData: any
}

const PerpanjanganDataLayout = ({data, savedData, likedData} : PerpanjanganDataLayoutType) => {

    const {layout} = useSelector((state:any) => state.peminjamanState)

    return (
        <>
            {layout === 'grid' && <PerpanjanganGrid data={data} savedData={savedData} likedData={likedData} />}
            {layout === 'list' && <PerpanjanganList data={data} />}
        </>
    )
}

export default PerpanjanganDataLayout