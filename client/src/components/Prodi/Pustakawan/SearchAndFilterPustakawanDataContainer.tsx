import SearchFilter from "./SearchFilter"
import StatusAkunFilter from "./StatusAkunFilter"

const SearchAndFilterPustakawanDataContainer = () => {
  return (
    <section className='w-full flex items-center gap-x-2'>
      <SearchFilter />
      <StatusAkunFilter />
    </section>
  )
}

export default SearchAndFilterPustakawanDataContainer