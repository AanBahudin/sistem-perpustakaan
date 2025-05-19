import { useSelector } from 'react-redux'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'
import { useRouteLoaderData } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const PeminjamanDataLayout = ({peminjamanData} : {peminjamanData: any} ) => {
  console.log(peminjamanData)
  
  // const {data} = useRouteLoaderData('peminjaman-data')
  const [searchParams] = useSearchParams();
  const {peminjamanFilter} = useSelector((state:any) => state.peminjamanState)
  const layout = searchParams.get('layout') || 'grid';
  
  const newFilter = peminjamanFilter ? peminjamanFilter : 'Semua'
  const newLayout = layout ? layout : 'grid'

  const newData = peminjamanData.filter((item:any) => {
    if (newFilter === 'Semua') return item
    return item.statusPeminjaman === peminjamanFilter
  })

  return (
    <>
      {newLayout === 'grid' && <PeminjamanGrid data={newData} />}
      {newLayout === 'list' && <PeminjamanList data={newData} />}
    </>
  )
}

export default PeminjamanDataLayout