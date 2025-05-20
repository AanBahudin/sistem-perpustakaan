import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

const PeminjamanDataLayout = ({peminjamanData} : {peminjamanData: any} ) => {
  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={peminjamanData} />}
      {layout === 'list' && <PeminjamanList data={peminjamanData} />}
    </>
  )
}

export default PeminjamanDataLayout