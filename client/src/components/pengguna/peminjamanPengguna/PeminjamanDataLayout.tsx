import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

type PeminjamanDataLayoutType = {
  peminjamanData: any,
  savedData: any,
  likedData: any
}

const PeminjamanDataLayout = ({peminjamanData, savedData, likedData} : PeminjamanDataLayoutType ) => {
  const {layout} = useSelector((state:any) => state.peminjamanState)

  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={peminjamanData} savedData={savedData} likedData={likedData}  />}
      {layout === 'list' && <PeminjamanList data={peminjamanData} savedData={savedData} likedData={likedData} />}
    </>
  )
}

export default PeminjamanDataLayout