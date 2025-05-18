import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

const PeminjamanDataLayout = () => {
  const {layout} = useSelector((state: any) => state.peminjamanState)
  return (
    <>
      {layout === 'grid' && <PeminjamanGrid />}
      {layout === 'list' && <PeminjamanList />}
    </>
  )
}

export default PeminjamanDataLayout