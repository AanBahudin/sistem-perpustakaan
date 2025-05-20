import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

const PeminjamanDataLayout = ({peminjamanData} : {peminjamanData: any} ) => {
  const {peminjamanFilter, layout} = useSelector((state:any) => state.peminjamanState)
  const newFilter = peminjamanFilter ? peminjamanFilter : 'Semua'

  const newData = peminjamanData.filter((item:any) => {
    if (newFilter === 'Semua') return item
    return item.statusPeminjaman === peminjamanFilter
  })

  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={newData} />}
      {layout === 'list' && <PeminjamanList data={newData} />}
    </>
  )
}

export default PeminjamanDataLayout