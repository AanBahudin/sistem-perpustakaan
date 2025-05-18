import { useRouteLoaderData } from 'react-router-dom'
import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

const PeminjamanDataLayout = ({layout} : {layout: 'grid' | 'list'}) => {

  const {data, total} = useRouteLoaderData('peminjaman-data')

  return (
    <>
      {layout === 'grid' && <PeminjamanGrid data={data} />}
      {layout === 'list' && <PeminjamanList />}
    </>
  )
}

export default PeminjamanDataLayout