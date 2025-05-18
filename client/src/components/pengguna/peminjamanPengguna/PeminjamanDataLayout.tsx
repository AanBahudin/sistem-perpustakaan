import PeminjamanGrid from './PeminjamanGrid'
import PeminjamanList from './PeminjamanList'

const PeminjamanDataLayout = ({layout} : {layout: 'grid' | 'list'}) => {
  return (
    <>
      {layout === 'grid' && <PeminjamanGrid />}
      {layout === 'list' && <PeminjamanList />}
    </>
  )
}

export default PeminjamanDataLayout