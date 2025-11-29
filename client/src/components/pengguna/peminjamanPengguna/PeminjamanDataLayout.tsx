import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

type PeminjamanDataLayoutType = {
  peminjamanData: any,
}

const PeminjamanDataLayout = ({peminjamanData} : PeminjamanDataLayoutType ) => {
  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={peminjamanData} />}
      {layout === 'list' && <PeminjamanList data={peminjamanData} />}
    </>
  )
}

export default PeminjamanDataLayout