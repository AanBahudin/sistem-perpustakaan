import { ListFilter } from 'lucide-react'
import SearchCategoryFilter from './SearchCategoryFilter'
import ISBNSearchInput from './ISBNSearchInput'
import PenulisSearchInput from './PenulisSearchInput'
import PenerbitSearchInput from './PenerbitSearchInput'

type SearchFilterType = {
  kategori: any,
  penerbit: any,
  penulis: any
}

const SearchFilter = ({kategori, penerbit, penulis} : SearchFilterType) => {

  return (
    <section className='w-full border-r-2 h-[100vh]'>
        <main className='flex items-start justify-start gap-x-4'>
            <ListFilter className='w-5 h-5'/>
            <h1 className='uppercase font-semibold'>Filter</h1>
        </main>
        <div className='w-[90%] mt-6'>
          <SearchCategoryFilter data={kategori} />
          <ISBNSearchInput />
          <PenulisSearchInput data={penulis} />
          <PenerbitSearchInput data={penerbit} />
        </div>
    </section>
  )
}

export default SearchFilter