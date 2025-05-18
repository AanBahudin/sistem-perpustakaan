import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'
import { useRouteLoaderData } from 'react-router-dom'

const PeminjamanDataLayout = () => {
  const {data} = useRouteLoaderData('peminjaman-data')
  const {layout, peminjamanFilter} = useSelector((state:any) => state.peminjamanState)

  const newFilter = peminjamanFilter ? peminjamanFilter : 'Semua'

  const newData = data.filter((item:any) => {
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