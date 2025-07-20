import { ListFilter } from 'lucide-react'
import SearchCategoryFilter from './SearchCategoryFilter'

const SearchFilter = ({kategori} : {kategori: any}) => {

  return (
    <section className='w-full border-r-2 min-h-[60vh]'>
        <main className='flex items-start justify-start gap-x-4'>
            <ListFilter className='w-5 h-5'/>
            <h1 className='uppercase font-semibold'>Filter</h1>
        </main>
        <div className='w-full mt-6'>
          <SearchCategoryFilter data={kategori.data} />
        </div>
    </section>
  )
}

export default SearchFilter