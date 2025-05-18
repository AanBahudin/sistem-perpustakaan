import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'
import { useRouteLoaderData } from 'react-router-dom'

const PeminjamanDataLayout = () => {
  const {data} = useRouteLoaderData('peminjaman-data')
  const {layout, peminjamanFilter} = useSelector((state:any) => state.peminjamanState)
  
  const newData = data.filter((item:any) => {
    if (peminjamanFilter === 'Semua') return item
    return item.statusPeminjaman === peminjamanFilter || 'Semua'
  })
  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={newData} />}
      {layout === 'list' && <PeminjamanList data={newData} />}
    </>
  )
}

export default PeminjamanDataLayout